// Pratinjau template: /template.html?t=<slug>&fw=blade|react|vue
const params = new URLSearchParams(location.search);
const slug = params.get("t") ?? "larisa";
const framework = params.get("fw") ?? "react";
const root = document.getElementById("template")!;
const pascal = slug.replace(/(^|-)([a-z])/g, (_, __, char: string) =>
  char.toUpperCase(),
);

const react = import.meta.glob("../../templates/*/react/*.tsx");
const vue = import.meta.glob("../../templates/*/vue/*.vue");

if (framework === "react") {
  const [{ createElement }, { createRoot }, module] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    react[`../../templates/${slug}/react/${pascal}.tsx`]!() as Promise<{
      default: () => null;
    }>,
  ]);
  createRoot(root).render(createElement(module.default));
} else if (framework === "vue") {
  const [{ createApp }, module] = await Promise.all([
    import("vue"),
    vue[`../../templates/${slug}/vue/${pascal}.vue`]!() as Promise<{
      default: object;
    }>,
  ]);
  createApp(module.default).mount(root);
} else {
  const response = await fetch(`/templates/${slug}.html`);
  if (!response.ok)
    throw new Error(
      `Template Blade "${slug}" belum dirender (${response.status})`,
    );
  root.innerHTML = await response.text();
  const { default: Alpine } = await import("alpinejs");
  Alpine.start();
}
requestAnimationFrame(() => (document.body.dataset.ready = "true"));
