import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  INSTANCES,
  LONG_TASK_MS,
  type ClientMetrics,
  type HtmlMetrics,
} from "./measure.ts";
import type { TypingMetrics } from "./typing.ts";

export const BUDGETS_PATH = resolve(
  import.meta.dirname,
  "../perf-budgets.json",
);
const REPORT_DIR = resolve(import.meta.dirname, "../../../test-results");
/** Headroom when budgets are written: bytes vary a little with the date (calendars) and Livewire's ids. */
const BYTE_HEADROOM = 1.02;
/** Deterministic per-instance numbers with exact budgets. */
const BYTE_KEYS = [
  "raw",
  "gzip",
  "alpine",
  "morphElements",
  "cloneDirectives",
] as const;

export interface ComponentMetrics {
  name: string;
  html: HtmlMetrics;
  client: ClientMetrics;
}

/** Page-wide numbers of the empty perf page, subtracted from every component. */
export interface Baseline {
  alpineInitMs: number;
  navigateMs: number;
  updateBytes: number;
}

/** Limits that apply to every component. Timing limits are generous on purpose: CI machines are slower. */
interface Limits {
  serverMsPerInstance: number;
  morphMsPerInstance: number;
  alpineInitMsPerInstance: number;
  navigateMsPerInstance: number;
  /** Update response bytes per instance over the instance's own HTML (JSON escaping adds a few percent). */
  updateRatio: number;
}

export interface Budgets {
  limits: Limits;
  /** Per component, exact byte budgets (with a small headroom). */
  html: Record<
    string,
    Pick<
      HtmlMetrics,
      "raw" | "gzip" | "alpine" | "morphElements" | "cloneDirectives"
    >
  >;
  /** Components exempt from one check, with the reason. */
  exceptions?: Record<string, Record<string, string>>;
  /** Most Livewire requests one typing burst may send. */
  typing: Record<string, number>;
}

/** Per-instance numbers derived from a component's page of INSTANCES copies. */
export function perInstance(metrics: ComponentMetrics, baseline: Baseline) {
  const { client, html } = metrics;
  return {
    serverMs: client.serverMs / INSTANCES,
    alpineInitMs:
      Math.max(0, client.alpineInitMs - baseline.alpineInitMs) / INSTANCES,
    navigateMs:
      Math.max(0, client.navigateMs - baseline.navigateMs) / INSTANCES,
    morphMs: client.morphMs / INSTANCES,
    updateRatio:
      (client.updateBytes - baseline.updateBytes) / INSTANCES / html.raw,
  };
}

export function readBudgets(): Budgets | null {
  if (!existsSync(BUDGETS_PATH)) return null;
  return JSON.parse(readFileSync(BUDGETS_PATH, "utf8")) as Budgets;
}

/** Every budget a component breaks, as readable lines. */
export function budgetFailures(
  metrics: ComponentMetrics,
  baseline: Baseline,
  budgets: Budgets,
): string[] {
  const failures: string[] = [];
  const { limits } = budgets;
  const per = perInstance(metrics, baseline);
  const check = (ok: boolean, line: string) => {
    if (!ok) failures.push(line);
  };
  const html = budgets.html[metrics.name];
  if (!html) failures.push("no byte budget (run with LIVEWIRE_PERF_WRITE=1)");
  for (const key of BYTE_KEYS) {
    if (html)
      check(
        metrics.html[key] <= html[key],
        `${key} ${metrics.html[key]} > ${html[key]}`,
      );
  }
  const exempt = budgets.exceptions?.[metrics.name] ?? {};
  const { client } = metrics;
  check(
    per.serverMs <= limits.serverMsPerInstance,
    `server ${per.serverMs.toFixed(3)} ms/instance > ${limits.serverMsPerInstance}`,
  );
  check(
    per.morphMs <= limits.morphMsPerInstance,
    `morph ${per.morphMs.toFixed(2)} ms/instance > ${limits.morphMsPerInstance}`,
  );
  check(
    per.morphMs < LONG_TASK_MS,
    `one instance alone makes a re-render a long task (${per.morphMs.toFixed(1)} ms)`,
  );
  check(
    per.alpineInitMs <= limits.alpineInitMsPerInstance,
    `Alpine init ${per.alpineInitMs.toFixed(2)} ms/instance > ${limits.alpineInitMsPerInstance}`,
  );
  check(
    per.navigateMs <= limits.navigateMsPerInstance,
    `navigate ${per.navigateMs.toFixed(2)} ms/instance > ${limits.navigateMsPerInstance}`,
  );
  check(
    per.updateRatio <= limits.updateRatio,
    `update response ${per.updateRatio.toFixed(3)}x its HTML > ${limits.updateRatio}`,
  );
  check(
    client.listenerGrowth <= 0,
    `${client.listenerGrowth} listeners added by re-renders`,
  );
  // Animated text (typing, scrambling) can hold a few nodes in flight; a leak grows with every update.
  check(
    client.nodeGrowth <= INSTANCES || "nodeGrowth" in exempt,
    `${client.nodeGrowth} DOM nodes leaked`,
  );
  return failures;
}

export function typingFailures(
  typing: Record<string, TypingMetrics>,
  budgets: Budgets,
): string[] {
  return Object.entries(typing).flatMap(([name, metrics]) => {
    const limit = budgets.typing[name];
    if (limit === undefined) return [`typing ${name}: no budget`];
    return metrics.requests <= limit
      ? []
      : [`typing ${name}: ${metrics.requests} requests > ${limit}`];
  });
}

/** Byte budgets from the current numbers; limits are kept from the existing file. */
export function writeBudgets(
  components: ComponentMetrics[],
  typing: Record<string, TypingMetrics>,
  previous: Pick<Budgets, "limits" | "exceptions">,
): void {
  const { limits, exceptions } = previous;
  const up = (value: number) => Math.ceil(value * BYTE_HEADROOM);
  const budgets: Budgets = {
    limits,
    ...(exceptions ? { exceptions } : {}),
    html: Object.fromEntries(
      components.map(({ name, html }) => [
        name,
        {
          raw: up(html.raw),
          gzip: up(html.gzip),
          alpine: up(html.alpine),
          morphElements: html.morphElements,
          cloneDirectives: html.cloneDirectives,
        },
      ]),
    ),
    typing: Object.fromEntries(
      Object.entries(typing).map(([name, { requests }]) => [name, requests]),
    ),
  };
  writeFileSync(BUDGETS_PATH, `${JSON.stringify(budgets, null, 2)}\n`);
}

const ms = (value: number, digits = 3) => value.toFixed(digits);

/** JSON with every number, and a Markdown table sorted by gzip size. */
export function writeReport(
  major: number,
  baseline: Baseline,
  components: ComponentMetrics[],
  typing: Record<string, TypingMetrics>,
): string {
  mkdirSync(REPORT_DIR, { recursive: true });
  const stem = join(REPORT_DIR, `livewire-perf-${major}`);
  writeFileSync(
    `${stem}.json`,
    `${JSON.stringify({ major, instances: INSTANCES, baseline, components, typing }, null, 2)}\n`,
  );
  const rows = [...components]
    .sort((a, b) => b.html.gzip - a.html.gzip)
    .map((metrics) => {
      const { name, html, client } = metrics;
      const per = perInstance(metrics, baseline);
      return `| ${name} | ${html.raw} | ${html.gzip} | ${html.gzipRepeat} | ${html.xData} | ${html.alpine} | ${html.morphElements} | ${html.cloneDirectives} | ${ms(per.serverMs)} | ${ms(per.alpineInitMs, 2)} | ${ms(per.navigateMs, 2)} | ${ms(per.morphMs, 2)} | ${client.updateBytes} | ${client.loadLongTasks.length}/${client.updateLongTasks.length} | ${client.listenerGrowth} | ${client.nodeGrowth} |`;
    });
  const typingRows = Object.entries(typing).map(
    ([name, t]) =>
      `| ${name} | ${t.keys} | ${t.requests} | ${t.requestBytes} | ${t.responseBytes} |`,
  );
  const markdown = [
    `# Livewire ${major} perf (${INSTANCES} instances per page)`,
    "",
    `Baseline page: Alpine init ${baseline.alpineInitMs} ms, navigate ${baseline.navigateMs} ms, update ${baseline.updateBytes} B.`,
    "",
    "Bytes are per instance. Server, Alpine init, navigate, and morph are ms per instance. Update is the response body in bytes for all instances; long tasks are counted on the whole page.",
    "",
    "| component | raw | gzip | gzip repeat | x-data | alpine attrs | morph elements | clone directives | server | alpine init | navigate | morph | update | long tasks load/update | listeners | nodes |",
    "| --- | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: |",
    ...rows,
    "",
    "## Typing (wire:model.live)",
    "",
    "| field | keys | requests | request bytes | response bytes |",
    "| --- | --: | --: | --: | --: |",
    ...typingRows,
    "",
  ].join("\n");
  writeFileSync(`${stem}.md`, markdown);
  return `${stem}.md`;
}
