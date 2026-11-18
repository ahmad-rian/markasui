// Pratinjau template: /template.html?t=<slug>&fw=blade|react|vue|svelte|astro|angular
import type { Type } from "@angular/core";
import type { Component } from "svelte";

const params = new URLSearchParams(location.search);
const slug = params.get("t") ?? "larisa";
const framework = params.get("fw") ?? "react";
const root = document.getElementById("template")!;
const pascal = slug.replace(/(^|-)([a-z])/g, (_, __, char: string) =>
  char.toUpperCase(),
);

const react = import.meta.glob("../../templates/*/react/*.tsx");
const vue = import.meta.glob("../../templates/*/vue/*.vue");
const svelte = import.meta.glob("../../templates/*/svelte/*.svelte");
const angular = import.meta.glob("../../templates/*/angular/*.component.ts");

/** Modul template untuk framework ini, atau error yang jelas kalau versinya belum ada. */
function load<T>(
  modules: Record<string, () => Promise<unknown>>,
  path: string,
): Promise<{ default: T }> {
  const loader = modules[path];
  if (!loader)
    throw new Error(`Template ${framework} "${slug}" belum ada (${path})`);
  return loader() as Promise<{ default: T }>;
}

if (framework === "react") {
  const [{ createElement }, { createRoot }, module] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    load<() => null>(react, `../../templates/${slug}/react/${pascal}.tsx`),
  ]);
  createRoot(root).render(createElement(module.default));
} else if (framework === "vue") {
  const [{ createApp }, module] = await Promise.all([
    import("vue"),
    load<object>(vue, `../../templates/${slug}/vue/${pascal}.vue`),
  ]);
  createApp(module.default).mount(root);
} else if (framework === "svelte") {
  const [{ mount }, module] = await Promise.all([
    import("svelte"),
    load<Component>(svelte, `../../templates/${slug}/svelte/${pascal}.svelte`),
  ]);
  mount(module.default, { target: root });
} else if (framework === "angular") {
  const [core, { createApplication }, module] = await Promise.all([
    import("@angular/core"),
    import("@angular/platform-browser"),
    load<Type<unknown>>(
      angular,
      `../../templates/${slug}/angular/${slug}.component.ts`,
    ),
  ]);
  const app = await createApplication({
    providers: [core.provideZonelessChangeDetection()],
  });
  // Host sendiri di dalam #template supaya class host Angular tidak mengubah wrapper playground.
  const host = root.appendChild(document.createElement("div"));
  const ref = core.createComponent(module.default, {
    environmentInjector: app.injector,
    hostElement: host,
  });
  app.attachView(ref.hostView);
  ref.changeDetectorRef.detectChanges();
} else if (framework === "astro") {
  // HTML dan script dibuat oleh scripts/render-astro.ts ke public/astro/templates/.
  const { mountAstroHtml } = await import("./astro-html");
  await mountAstroHtml(`/astro/templates/${slug}.html`, root);
} else {
  const response = await fetch(`/templates/${slug}.html`);
  if (!response.ok)
    throw new Error(
      `Template Blade "${slug}" belum dirender (${response.status})`,
    );
  root.innerHTML = await response.text();
  // Template Blade dengan Lottie (belajar) memanggil window.loadLottie; dimuat hanya saat dipakai.
  Object.assign(window, {
    loadLottie: () =>
      import("lottie-web/build/player/lottie_light").then((m) => m.default),
  });
  const { default: Alpine } = await import("alpinejs");
  Alpine.start();
}
requestAnimationFrame(() => (document.body.dataset.ready = "true"));
