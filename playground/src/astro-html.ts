/**
 * Pasang HTML hasil astro build (scripts/render-astro.ts) ke `target`, lalu jalankan ulang script
 * yang diproses Astro (inline kecil atau file di /astro/_astro/) di halaman ini.
 */
export async function mountAstroHtml(url: string, target: HTMLElement) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`HTML Astro "${url}" tidak ada (${response.status})`);

  const page = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  );
  const scripts = [...page.querySelectorAll("script")];
  scripts.forEach((script) => script.remove());
  target.innerHTML = page.body.innerHTML;

  for (const original of scripts) {
    const script = document.createElement("script");
    for (const { name, value } of original.attributes)
      script.setAttribute(name, value);
    script.textContent = original.textContent;
    const loaded = original.src
      ? new Promise((resolve) => script.addEventListener("load", resolve))
      : Promise.resolve();
    document.body.append(script);
    await loaded;
  }
}
