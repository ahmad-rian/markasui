import { fixtureName, fixtureRoot, markReady } from "./fixture";

// HTML dan script dibuat oleh scripts/render-astro.ts (astro build) ke public/astro/.
const name = fixtureName();
const response = await fetch(`/astro/${name}.html`);
if (!response.ok)
  throw new Error(`Fixture Astro "${name}" tidak ada (${response.status})`);

const page = new DOMParser().parseFromString(
  await response.text(),
  "text/html",
);
const scripts = [...page.querySelectorAll("script")];
scripts.forEach((script) => script.remove());
fixtureRoot().innerHTML = page.body.innerHTML;

// Script yang diproses Astro (inline kecil atau file di /astro/_astro/) dijalankan ulang di halaman ini.
for (const original of scripts) {
  const script = document.createElement("script");
  for (const { name: attr, value } of original.attributes)
    script.setAttribute(attr, value);
  script.textContent = original.textContent;
  const loaded = original.src
    ? new Promise((resolve) => script.addEventListener("load", resolve))
    : Promise.resolve();
  document.body.append(script);
  await loaded;
}
markReady();
