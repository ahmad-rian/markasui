import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), vue()],
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
