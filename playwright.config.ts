import { defineConfig, devices } from "@playwright/test";

/** PLAYGROUND_PORT: jalankan tes terhadap playground lain (mis. agen paralel) tanpa mengganggu :5173. */
const port = Number(process.env.PLAYGROUND_PORT ?? 5173);

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 800, height: 600 },
      },
    },
  ],
  webServer: {
    command: `pnpm blade:playground && pnpm astro:playground && pnpm exec vite playground --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    // Render awal: 1 + 14 proses PHP (contoh dan template Blade) ditambah contoh Astro sebelum Vite jalan.
    timeout: 180_000,
  },
});
