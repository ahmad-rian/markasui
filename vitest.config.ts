import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), vue()],
  // Paket workspace diuji dari src/, bukan dist/ (dist tidak ada di CI sebelum build).
  resolve: {
    alias: {
      markasui: fileURLToPath(
        new URL("packages/cli/src/index.ts", import.meta.url),
      ),
      "@markasui/mcp": fileURLToPath(
        new URL("packages/mcp/src/server.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}", "packages/*/test/**/*.test.ts"],
    setupFiles: ["tests/unit/setup.ts"],
    coverage: {
      include: ["components/**/*.{tsx,vue}", "packages/*/src/**/*.ts"],
      exclude: ["packages/*/src/build.ts", "packages/*/src/bin.ts"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
