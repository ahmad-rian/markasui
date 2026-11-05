import { copyText } from "./clipboard";
import { onPageLoad } from "./lifecycle";
import { getFramework } from "./prefs";

onPageLoad(() =>
  document
    .querySelectorAll<HTMLElement>("[data-copy-page]:not([data-ready])")
    .forEach((root) => {
      root.dataset.ready = "";
      const raw = root.querySelector("[data-copy-page-data]")?.textContent;
      if (!raw) return;
      const data = JSON.parse(raw) as {
        markdown: string;
        prompts: Record<string, string>;
      };

      const markdownButton = root.querySelector<HTMLElement>(
        "[data-copy-markdown]",
      );
      markdownButton?.addEventListener(
        "click",
        () => void copyText(data.markdown, markdownButton),
      );

      const promptButton =
        root.querySelector<HTMLElement>("[data-copy-prompt]");
      promptButton?.addEventListener(
        "click",
        () => void copyText(data.prompts[getFramework()] ?? "", promptButton),
      );

      // Navigasi panah di dalam menu (WAI-ARIA menu).
      const menu = root.querySelector<HTMLElement>("[role=menu]");
      menu?.addEventListener("toggle", (event) => {
        if ((event as ToggleEvent).newState === "open")
          menu.querySelector<HTMLElement>("[role=menuitem]")?.focus();
      });
      menu?.addEventListener("keydown", (event) => {
        const items = [
          ...menu.querySelectorAll<HTMLElement>("[role=menuitem]"),
        ];
        const index = items.indexOf(document.activeElement as HTMLElement);
        const next = {
          ArrowDown: index + 1,
          ArrowUp: index - 1,
          Home: 0,
          End: items.length - 1,
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        items[(next + items.length) % items.length]?.focus();
      });
    }),
);
