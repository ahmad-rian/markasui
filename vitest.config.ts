import { fileURLToPath } from "node:url";
import angular from "@analogjs/vite-plugin-angular";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { getViteConfig } from "astro/config";
import { defineConfig, type ViteUserConfig } from "vitest/config";

const workspace = fileURLToPath(new URL(".", import.meta.url));

// Paket workspace diuji dari src/, bukan dist/ (dist tidak ada di CI sebelum build).
const alias = {
  markasui: fileURLToPath(
    new URL("packages/cli/src/index.ts", import.meta.url),
  ),
  "@markasui/mcp": fileURLToPath(
    new URL("packages/mcp/src/server.ts", import.meta.url),
  ),
};

/** Astro dikompilasi lewat plugin Vite milik Astro, dipakai container API di tes. */
const astroProject = async (
  env: Parameters<ReturnType<typeof getViteConfig>>[0],
) =>
  (await getViteConfig(
    {
      test: {
        name: "astro",
        environment: "node",
        include: ["tests/unit/**/*.astro.test.ts"],
      },
    },
    { root: workspace, logLevel: "error" },
  )(env)) as ViteUserConfig;

export default defineConfig(async (env) => ({
  resolve: { alias },
  test: {
    // Satu proyek per toolchain: plugin Angular dan Astro tidak boleh menyentuh file React, Vue, Svelte.
    projects: [
      {
        extends: true,
        plugins: [react(), vue()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: [
            "tests/unit/**/*.test.{ts,tsx}",
            "packages/*/test/**/*.test.ts",
          ],
          exclude: [
            "tests/unit/**/*.svelte.test.ts",
            "tests/unit/**/*.angular.test.ts",
            "tests/unit/**/*.astro.test.ts",
          ],
          setupFiles: ["tests/unit/setup.ts"],
        },
      },
      {
        // svelteTesting memaksa kondisi "browser" untuk semua paket; dipisah supaya React tidak ikut.
        extends: true,
        plugins: [svelte(), svelteTesting()],
        test: {
          name: "svelte",
          environment: "jsdom",
          include: ["tests/unit/**/*.svelte.test.ts"],
          setupFiles: ["tests/unit/setup.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          angular({
            tsconfig: `${workspace}tsconfig.angular.spec.json`,
            workspaceRoot: workspace,
            jit: false,
          }),
        ],
        test: {
          name: "angular",
          environment: "jsdom",
          include: ["tests/unit/**/*.angular.test.ts"],
          setupFiles: ["tests/unit/setup.ts"],
        },
      },
      await astroProject(env),
    ],
    coverage: {
      include: [
        "components/**/*.{tsx,vue,svelte,astro}",
        "components/**/*.component.ts",
        "packages/*/src/**/*.ts",
      ],
      exclude: ["packages/*/src/build.ts", "packages/*/src/bin.ts"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
}));
