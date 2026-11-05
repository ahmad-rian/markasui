import { onAfterSwap } from "./lifecycle";

// HTML awal disimpan sebelum island hydrate dan sebelum Alpine berjalan. Tombol reload memasangnya
// kembali: astro-island yang baru akan hydrate ulang, dan Alpine menginisialisasi DOM Blade baru.
const pristine = new WeakMap<HTMLElement, string>();
const capture = () =>
  document
    .querySelectorAll<HTMLElement>("[data-preview-stage]")
    .forEach((stage) => pristine.set(stage, stage.innerHTML));

capture();
onAfterSwap(capture);

document.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest("[data-preview-reload]");
  const stage = button
    ?.closest("[data-preview]")
    ?.querySelector<HTMLElement>("[data-preview-stage]");
  const html = stage && pristine.get(stage);
  if (stage && html) stage.innerHTML = html;
});
