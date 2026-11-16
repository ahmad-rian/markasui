/**
 * Livewire harness: builds a throwaway Laravel app with livewire/livewire, links the repo's Blade
 * components into it, and drives the test pages with Playwright.
 *
 * Usage: pnpm test:livewire
 *   LIVEWIRE=3|4          Livewire major version (default 4)
 *   LIVEWIRE_PORT=8351    port for the PHP server
 *   LIVEWIRE_APP_DIR=...  where the app is created (default: <tmp>/markas-livewire-<major>)
 */
import { spawn, type ChildProcess } from "node:child_process";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { formsAudit } from "./audits/forms.ts";
import { morphAudit } from "./audits/morph.ts";
import { islandsAudit, navigateAudit } from "./audits/navigate.ts";
import { stateAudit } from "./audits/state.ts";
import type { Audit, AuditResult } from "./lib.ts";
import { setupApp } from "./setup.ts";

const SUPPORTED = [3, 4];
const SERVER_WORKERS = "8";
const SERVER_START_TIMEOUT_MS = 30_000;

const major = Number(process.env.LIVEWIRE ?? 4);
const port = Number(process.env.LIVEWIRE_PORT ?? 8351);
const base = `http://127.0.0.1:${port}`;

/** PHP's built-in server with several workers, so parallel pages and file uploads do not queue. */
function startServer(appDir: string): ChildProcess {
  const router = join(
    appDir,
    "vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php",
  );
  return spawn("php", ["-S", `127.0.0.1:${port}`, router], {
    cwd: join(appDir, "public"),
    env: { ...process.env, PHP_CLI_SERVER_WORKERS: SERVER_WORKERS },
    stdio: "ignore",
    // Own process group, so stopServer() also ends the forked workers.
    detached: true,
  });
}

function stopServer(server: ChildProcess): void {
  if (server.pid === undefined) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill();
  }
}

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + SERVER_START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((done) => setTimeout(done, 250));
  }
  throw new Error(`PHP server did not start on ${base}`);
}

function report(results: AuditResult[]): boolean {
  console.log(`\nLivewire ${major} results`);
  for (const { name, passed, failures } of results) {
    const total = passed + failures.length;
    console.log(
      `  ${failures.length === 0 ? "PASS" : "FAIL"}  ${name}: ${passed}/${total}`,
    );
    for (const failure of failures) console.log(`        - ${failure}`);
  }
  return results.every((r) => r.failures.length === 0);
}

async function main(): Promise<number> {
  if (!SUPPORTED.includes(major)) {
    console.error(
      `LIVEWIRE must be one of ${SUPPORTED.join(", ")}, got ${process.env.LIVEWIRE}`,
    );
    return 1;
  }
  const appDir = await setupApp(major);
  const server = startServer(appDir);
  const browser = await chromium.launch();
  try {
    await waitForServer();
    const audits: Audit[] = [morphAudit, stateAudit, formsAudit, navigateAudit];
    if (major >= 4) audits.push(islandsAudit);
    const results: AuditResult[] = [];
    for (const audit of audits) {
      const started = Date.now();
      const result = await audit({ browser, base, major });
      console.log(
        `  ${result.name}: ${result.passed} passed, ${result.failures.length} failed (${Math.round((Date.now() - started) / 1000)}s)`,
      );
      results.push(result);
    }
    return report(results) ? 0 : 1;
  } finally {
    await browser.close();
    stopServer(server);
  }
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
