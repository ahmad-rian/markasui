import { gzipSync } from "node:zlib";
import type { CDPSession, Page, Response } from "@playwright/test";
import { waitForLivewire } from "../lib.ts";

/** Instances of the example rendered on every perf page. */
export const INSTANCES = 20;
/** Unrelated re-renders per component (tick bumps). */
export const UPDATES = 20;
/** Re-renders before counting listeners and nodes. */
const WARM_UPS = 3;
/** Long tasks start at 50 ms by definition. */
export const LONG_TASK_MS = 50;

declare global {
  interface Window {
    __perf: {
      longTasks: number[];
      morphs: number[];
      alpineStart: number;
      alpineEnd: number;
      navStart: number;
      navEnd: number;
    };
  }
}

/** Bytes a component example puts on the page, read from the server HTML. */
export interface HtmlMetrics {
  /** Raw HTML per instance, averaged over all instances. */
  raw: number;
  /** One instance gzipped on its own, the cost of the first one on a page. */
  gzip: number;
  /** All instances gzipped together, divided by the count: the cost of repeats. */
  gzipRepeat: number;
  /** x-data and x-init attribute values in one instance. */
  xData: number;
  /** Every Alpine directive value (x-*, @*, :*) in one instance. */
  alpine: number;
  /** Elements Livewire's morph visits in one instance (wire:ignore subtrees are skipped). */
  morphElements: number;
  /** Alpine directives the morph evaluates again on each visited element (bindings, x-show, x-text...). */
  cloneDirectives: number;
}

/** What the browser does with a page of instances. */
export interface ClientMetrics {
  /** Alpine start on first load, alpine:init to alpine:initialized. */
  alpineInitMs: number;
  /** wire:navigate swap, livewire:navigating to livewire:navigated. */
  navigateMs: number;
  /** Median Livewire morph (morph to morphed hook) of one re-render. */
  morphMs: number;
  /** Median Blade render of all instances on the server, timed inside the view. */
  serverMs: number;
  /** Median Livewire update response body for an unrelated property change. */
  updateBytes: number;
  /** Long tasks during first load, and during the re-renders. */
  loadLongTasks: number[];
  updateLongTasks: number[];
  /** Change after the re-renders and a forced GC. */
  listenerGrowth: number;
  nodeGrowth: number;
  heapGrowthKb: number;
}

const median = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
};

const round = (value: number, digits = 3): number =>
  Number(value.toFixed(digits));

const ALPINE_ATTRIBUTE =
  /\s(x-[\w:.-]+|@[\w:.-]+|:[\w.-]+)="([^"]*)"|\s(x-[\w:.-]+|@[\w:.-]+|:[\w.-]+)='([^']*)'/g;

function alpineBytes(html: string): { xData: number; alpine: number } {
  let xData = 0;
  let alpine = 0;
  for (const match of html.matchAll(ALPINE_ATTRIBUTE)) {
    const name = match[1] ?? match[3] ?? "";
    const length = Buffer.byteLength(match[2] ?? match[4] ?? "");
    alpine += length;
    if (name === "x-data" || name === "x-init") xData += length;
  }
  return { xData, alpine };
}

/** Directives Alpine skips while cloning during a morph (events, init, effects, structure). */
const SKIPPED_ON_CLONE =
  /^(x-on:|@|x-init$|x-effect$|x-for$|x-if$|x-data$|x-cloak$|x-ignore|x-ref$|x-transition|x-teleport$)/;
const DIRECTIVE = /^(x-|@|:)/;

/** Deterministic morph work of one instance, counted by the browser's HTML parser. */
export function morphWork(
  page: Page,
  html: string,
): Promise<Pick<HtmlMetrics, "morphElements" | "cloneDirectives">> {
  return page.evaluate(
    ({ html, skipped, directive }) => {
      const skip = new RegExp(skipped);
      const isDirective = new RegExp(directive);
      const doc = new DOMParser().parseFromString(
        `<body>${html}</body>`,
        "text/html",
      );
      let morphElements = 0;
      let cloneDirectives = 0;
      const visit = (el: Element) => {
        morphElements++;
        for (const { name } of el.attributes)
          if (isDirective.test(name) && !skip.test(name)) cloneDirectives++;
        if (el.hasAttribute("wire:ignore")) return;
        for (const child of el.children) visit(child);
      };
      for (const child of doc.body.children) visit(child);
      return { morphElements, cloneDirectives };
    },
    { html, skipped: SKIPPED_ON_CLONE.source, directive: DIRECTIVE.source },
  );
}

/** Split the perf page HTML into its instances (each starts with a perf-i comment). */
export function splitInstances(page: string): string[] {
  const start = page.indexOf("<!--perf-i-->");
  const end = page.indexOf("<!--perf-end-->");
  if (start === -1 || end === -1) return [];
  return page.slice(start, end).split("<!--perf-i-->").slice(1);
}

export function htmlMetrics(
  page: string,
): Omit<HtmlMetrics, "morphElements" | "cloneDirectives"> {
  const instances = splitInstances(page);
  const first = instances[0] ?? "";
  const all = instances.join("");
  const count = Math.max(instances.length, 1);
  return {
    raw: Math.round(Buffer.byteLength(all) / count),
    gzip: gzipSync(first, { level: 6 }).length,
    gzipRepeat: Math.round(gzipSync(all, { level: 6 }).length / count),
    ...alpineBytes(first),
  };
}

const isUpdate = (response: Response): boolean =>
  response.request().method() === "POST" &&
  /\/livewire[^/]*\/update/.test(response.url());

/** Collect the body size of every Livewire update response on the page. */
export function trackUpdates(page: Page): { sizes: number[] } {
  const tracker = { sizes: [] as number[] };
  page.on("response", (response) => {
    if (!isUpdate(response)) return;
    response.body().then(
      (body) => tracker.sizes.push(body.length),
      () => tracker.sizes.push(-1),
    );
  });
  return tracker;
}

async function counters(cdp: CDPSession) {
  await cdp.send("HeapProfiler.collectGarbage");
  const dom = await cdp.send("Memory.getDOMCounters");
  const heap = await cdp.send("Runtime.getHeapUsage");
  return {
    listeners: dom.jsEventListeners,
    nodes: dom.nodes,
    heap: heap.usedSize,
  };
}

const readServerMs = (page: Page): Promise<number> =>
  page.evaluate(() =>
    Number(document.querySelector("#perf-ms")?.textContent ?? 0),
  );

async function bump(page: Page, tick: number): Promise<void> {
  await page.click("#lw-bump");
  await page.waitForFunction(
    (n) =>
      document.querySelector("#lw-tick")?.textContent?.trim() === String(n),
    tick,
  );
}

/** Load a page of instances, re-render it UPDATES times, then measure a wire:navigate into it. */
export async function clientMetrics(
  page: Page,
  url: (instances: number) => string,
): Promise<ClientMetrics> {
  const updates = trackUpdates(page);
  await page.goto(url(INSTANCES));
  await waitForLivewire(page);
  await page.waitForTimeout(200);
  const load = await page.evaluate(() => ({
    alpineInitMs: window.__perf.alpineEnd - window.__perf.alpineStart,
    longTasks: window.__perf.longTasks.splice(0),
  }));

  const cdp = await page.context().newCDPSession(page);
  // Warm-up re-renders, so state created once (lazily) by Livewire, Alpine, or a component is not counted as growth.
  for (let tick = 1; tick <= WARM_UPS; tick++) await bump(page, tick);
  await page.waitForTimeout(50);
  const before = await counters(cdp);
  await page.evaluate(() => {
    window.__perf.morphs = [];
    window.__perf.longTasks = [];
  });
  const serverSamples = [await readServerMs(page)];
  updates.sizes.length = 0;
  for (let tick = WARM_UPS + 1; tick <= WARM_UPS + UPDATES; tick++) {
    await bump(page, tick);
    serverSamples.push(await readServerMs(page));
  }
  await page.waitForTimeout(100);
  const after = await counters(cdp);
  await cdp.detach();
  const during = await page.evaluate(() => ({
    morphs: window.__perf.morphs,
    longTasks: window.__perf.longTasks,
  }));

  await page.goto(url(0));
  await waitForLivewire(page);
  await page.evaluate(() => {
    window.__perf.navEnd = 0;
  });
  await page.click("#perf-go");
  await page.waitForFunction(() => window.__perf.navEnd > 0);
  await page.waitForTimeout(50);
  const navigateMs = await page.evaluate(
    () => window.__perf.navEnd - window.__perf.navStart,
  );

  return {
    alpineInitMs: round(load.alpineInitMs, 2),
    navigateMs: round(navigateMs, 2),
    morphMs: round(median(during.morphs), 2),
    serverMs: round(median(serverSamples)),
    updateBytes: median(updates.sizes),
    loadLongTasks: load.longTasks,
    updateLongTasks: during.longTasks,
    listenerGrowth: after.listeners - before.listeners,
    nodeGrowth: after.nodes - before.nodes,
    heapGrowthKb: Math.round((after.heap - before.heap) / 1024),
  };
}
