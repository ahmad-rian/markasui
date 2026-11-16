/**
 * Bangun bundle preview Angular (AOT) ke public/angular/: preview.js plus satu chunk per contoh di
 * examples/angular dan per template di templates/<slug>/angular. Dipisah dari build Astro supaya kompiler Angular tidak menyentuh file situs.
 * Pemakaian (dari apps/docs): node scripts/angular-previews.ts
 */
import { resolve } from "node:path";
import angular from "@analogjs/vite-plugin-angular";
import { build } from "vite";

const docs = resolve(import.meta.dirname, "..");
const root = resolve(docs, "../..");

try {
  await build({
    configFile: false,
    root: docs,
    logLevel: "warn",
    publicDir: false,
    plugins: [
      angular({
        tsconfig: resolve(root, "tsconfig.angular.json"),
        workspaceRoot: root,
        transformFilter: (_code, id) =>
          /\.component\.ts$|\/examples\/angular\//.test(id),
      }),
    ],
    build: {
      outDir: resolve(docs, "public/angular"),
      emptyOutDir: true,
      target: "es2022",
      rollupOptions: {
        input: { preview: resolve(docs, "angular/preview.ts") },
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      },
    },
  });
  console.log("angular: preview ditulis ke public/angular");
} catch (error) {
  console.error(error);
  process.exit(1);
}
