import type { Browser, Page } from "@playwright/test";

/** The part of the Livewire browser API the audits use. */
interface LivewireWire {
  bump(): Promise<unknown>;
  [property: string]: unknown;
}

interface LivewireApi {
  all(): { $wire: LivewireWire }[];
  hook(name: string, callback: () => void): void;
}

declare global {
  interface Window {
    Livewire?: LivewireApi;
    __markasIds?: string[];
    __markasTotal?: number;
  }
  interface Element {
    /** Set on every element before a re-render; a missing mark means Livewire replaced the element. */
    __markasProbe?: number;
  }
}

/** Outcome of one audit: how many checks passed and a line per failed check. */
export interface AuditResult {
  name: string;
  passed: number;
  failures: string[];
}

export interface AuditContext {
  browser: Browser;
  base: string;
  major: number;
}

export type Audit = (context: AuditContext) => Promise<AuditResult>;

/** Collects pass/fail lines for one audit. */
export function recorder(name: string) {
  const result: AuditResult = { name, passed: 0, failures: [] };
  return {
    result,
    record(ok: boolean, label: string, detail = "") {
      if (ok) result.passed++;
      else result.failures.push(detail ? `${label}: ${detail}` : label);
    },
  };
}

/** Collects page errors and console errors, the signal for Alpine expression failures. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error).slice(0, 200)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text().slice(0, 200));
  });
  return errors;
}

/** Wait until Livewire has booted the page component. */
export async function waitForLivewire(page: Page): Promise<void> {
  await page.waitForFunction(() => (window.Livewire?.all().length ?? 0) > 0);
}

/** Wait for a debounced update and the morph that follows. */
export const SETTLE_MS = 450;
