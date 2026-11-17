import type { Page } from "@playwright/test";
import { waitForLivewire } from "../lib.ts";

/** Delay between keystrokes: a fast typist. */
const KEY_DELAY_MS = 60;
/** Long enough for any debounce and the request that follows to settle. */
const SETTLE_MS = 900;

/** Requests and bytes a burst of typing sends to the server. */
export interface TypingMetrics {
  keys: number;
  requests: number;
  requestBytes: number;
  responseBytes: number;
}

interface Burst {
  name: string;
  /** Text typed into the field. */
  text: string;
  /** Keys pressed after the text, for example to pick a combobox option. */
  keys?: string[];
}

const BURSTS: Burst[] = [
  { name: "input", text: "hello world" },
  { name: "input-debounced", text: "hello world" },
  { name: "textarea", text: "hello world" },
  { name: "currency", text: "1250000" },
  { name: "currency-debounced", text: "1250000" },
  { name: "combobox", text: "jap", keys: ["ArrowDown", "Enter"] },
];

/** Type into each wire:model.live field of /perf-typing and count the Livewire requests per burst. */
export async function typingMetrics(
  page: Page,
  base: string,
): Promise<Record<string, TypingMetrics>> {
  const traffic = { requests: 0, requestBytes: 0, responseBytes: 0 };
  page.on("request", (request) => {
    if (request.method() !== "POST" || !/\/update/.test(request.url())) return;
    traffic.requests++;
    traffic.requestBytes += Buffer.byteLength(request.postData() ?? "");
  });
  page.on("response", (response) => {
    const request = response.request();
    if (request.method() !== "POST" || !/\/update/.test(response.url())) return;
    response.body().then(
      (body) => (traffic.responseBytes += body.length),
      () => undefined,
    );
  });

  await page.goto(`${base}/perf-typing`);
  await waitForLivewire(page);
  await page.waitForTimeout(200);

  const results: Record<string, TypingMetrics> = {};
  for (const { name, text, keys = [] } of BURSTS) {
    Object.assign(traffic, { requests: 0, requestBytes: 0, responseBytes: 0 });
    await page.click(
      `[data-test="${name}"] input, [data-test="${name}"] textarea`,
    );
    await page.keyboard.type(text, { delay: KEY_DELAY_MS });
    for (const key of keys) await page.keyboard.press(key);
    await page.waitForTimeout(SETTLE_MS);
    results[name] = { keys: text.length + keys.length, ...traffic };
  }
  return results;
}
