import { navigate } from "astro:transitions/client";

/** Overlay tampil minimal selama ini supaya transisinya terbaca, tidak berkedip. */
const MIN_VISIBLE_MS = 900;
const FADE_MS = 200;

const overlay = () =>
  document.querySelector<HTMLElement>("[data-language-overlay]");

async function switchLanguage(href: string, locale: string) {
  const element = overlay();
  if (!element) return navigate(href);

  element
    .querySelectorAll<HTMLElement>("[data-overlay-lang]")
    .forEach((block) => {
      block.hidden = block.dataset.overlayLang !== locale;
    });
  element.hidden = false;
  element.getBoundingClientRect(); // paksa reflow agar transisi opacity berjalan
  element.dataset.visible = "";
  element.dataset.running = "";

  const started = performance.now();
  const loaded = new Promise<void>((resolve) =>
    document.addEventListener("astro:page-load", () => resolve(), {
      once: true,
    }),
  );
  await navigate(href);
  await loaded;
  const remaining = MIN_VISIBLE_MS - (performance.now() - started);
  if (remaining > 0)
    await new Promise((resolve) => setTimeout(resolve, remaining));

  delete element.dataset.visible;
  setTimeout(() => {
    element.hidden = true;
    delete element.dataset.running;
  }, FADE_MS);
}

document.addEventListener("click", (event) => {
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
    "a[data-lang-switch]",
  );
  if (
    !link ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  )
    return;
  if (link.getAttribute("aria-current") === "true")
    return event.preventDefault();
  event.preventDefault();
  void switchLanguage(link.href, link.hreflang);
});
