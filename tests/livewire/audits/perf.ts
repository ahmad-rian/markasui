import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import type { Browser } from "@playwright/test";
import { recorder, trackErrors, type Audit } from "../lib.ts";
import {
  budgetFailures,
  readBudgets,
  typingFailures,
  writeBudgets,
  writeReport,
  type Baseline,
  type Budgets,
  type ComponentMetrics,
} from "../perf/budgets.ts";
import {
  clientMetrics,
  htmlMetrics,
  INSTANCES,
  morphWork,
  splitInstances,
} from "../perf/measure.ts";
import { typingMetrics } from "../perf/typing.ts";

const componentsDir = resolve(import.meta.dirname, "../../../components");
/** Few pages at once: timings get noisy when pages fight for the CPU. */
const PARALLEL_PAGES = 2;
/** Limits used when no budget file exists yet. */
const DEFAULT_LIMITS: Budgets["limits"] = {
  serverMsPerInstance: 8,
  morphMsPerInstance: 40,
  alpineInitMsPerInstance: 40,
  navigateMsPerInstance: 50,
  updateRatio: 1.15,
};

async function measure(
  browser: Browser,
  base: string,
  name: string,
): Promise<{ metrics: ComponentMetrics; errors: string[] }> {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 800 },
  });
  const errors = trackErrors(page);
  try {
    const url = (instances: number) => `${base}/perf/${name}?n=${instances}`;
    const response = await fetch(url(INSTANCES));
    const body = await response.text();
    const work = await morphWork(page, splitInstances(body)[0] ?? "");
    const html = { ...htmlMetrics(body), ...work };
    const client = await clientMetrics(page, url);
    return { metrics: { name, html, client }, errors };
  } finally {
    await page.close();
  }
}

/**
 * Bytes, server render time, Alpine init, morph, listener growth, and typing traffic for every
 * component, checked against tests/livewire/perf-budgets.json. LIVEWIRE_PERF_WRITE=1 rewrites
 * the byte and typing budgets from this run.
 */
export const perfAudit: Audit = async ({ browser, base, major }) => {
  const { result, record } = recorder("perf budgets");
  const budgets = readBudgets();
  const rewrite = process.env.LIVEWIRE_PERF_WRITE === "1";

  const empty = await measure(browser, base, "none");
  const baseline: Baseline = {
    alpineInitMs: empty.metrics.client.alpineInitMs,
    navigateMs: empty.metrics.client.navigateMs,
    updateBytes: empty.metrics.client.updateBytes,
  };
  record(
    empty.metrics.client.listenerGrowth <= 0 &&
      empty.metrics.client.nodeGrowth <= 0 &&
      empty.metrics.client.updateLongTasks.length === 0,
    "baseline page leaks nothing and has no long tasks",
    JSON.stringify(empty.metrics.client),
  );

  const filter = process.env.LIVEWIRE_PERF_ONLY?.split(",");
  const queue = readdirSync(componentsDir)
    .sort()
    .filter((name) => !filter || filter.includes(name));
  const components: ComponentMetrics[] = [];
  const worker = async () => {
    for (let name = queue.shift(); name; name = queue.shift()) {
      try {
        const { metrics, errors } = await measure(browser, base, name);
        components.push(metrics);
        const failures = budgets
          ? budgetFailures(metrics, baseline, budgets)
          : [];
        if (errors.length > 0) failures.push(`errors: ${errors.slice(0, 2)}`);
        record(failures.length === 0, name, failures.join("; "));
      } catch (error) {
        record(false, name, String(error).slice(0, 200));
      }
    }
  };
  await Promise.all(Array.from({ length: PARALLEL_PAGES }, worker));
  components.sort((a, b) => a.name.localeCompare(b.name));

  const typingPage = await browser.newPage();
  const typing = await typingMetrics(typingPage, base);
  await typingPage.close();
  if (budgets) {
    const failures = typingFailures(typing, budgets);
    record(failures.length === 0, "typing request budget", failures.join("; "));
  }

  const report = writeReport(major, baseline, components, typing);
  console.log(`  perf report: ${report}`);
  if (rewrite && !filter) {
    writeBudgets(components, typing, budgets ?? { limits: DEFAULT_LIMITS });
    console.log("  perf budgets rewritten");
  }
  if (!budgets) record(false, "perf budget file missing");
  return result;
};
