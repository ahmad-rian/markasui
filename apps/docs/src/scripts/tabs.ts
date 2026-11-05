import { onPageLoad } from "./lifecycle";

const storageKey = (group: string) => `markas-tabs-${group}`;

function select(root: HTMLElement, value: string, focus = false) {
  root
    .querySelectorAll<HTMLElement>(":scope > [role=tablist] > [role=tab]")
    .forEach((tab) => {
      const selected = tab.dataset.value === value;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
  root
    .querySelectorAll<HTMLElement>(":scope > [role=tabpanel]")
    .forEach((panel) => {
      panel.hidden = panel.dataset.value !== value;
    });
}

function selectGroup(group: string, value: string) {
  document
    .querySelectorAll<HTMLElement>(`[data-tabs-group="${group}"]`)
    .forEach((root) => select(root, value));
}

onPageLoad(() =>
  document
    .querySelectorAll<HTMLElement>("[data-docs-tabs]:not([data-ready])")
    .forEach((root) => {
      root.dataset.ready = "";
      const group = root.dataset.tabsGroup;
      const tabs = [
        ...root.querySelectorAll<HTMLElement>(
          ":scope > [role=tablist] > [role=tab]",
        ),
      ];
      if (group) {
        try {
          const saved = localStorage.getItem(storageKey(group));
          if (saved && tabs.some((tab) => tab.dataset.value === saved))
            select(root, saved);
        } catch {
          // Storage diblok: pakai tab pertama.
        }
      }

      const choose = (value: string, focus = false) => {
        select(root, value, focus);
        if (!group) return;
        selectGroup(group, value);
        try {
          localStorage.setItem(storageKey(group), value);
        } catch {
          // Abaikan.
        }
      };

      root
        .querySelector(":scope > [role=tablist]")
        ?.addEventListener("click", (event) => {
          const value = (event.target as HTMLElement).closest<HTMLElement>(
            "[role=tab]",
          )?.dataset.value;
          if (value) choose(value);
        });
      root
        .querySelector(":scope > [role=tablist]")
        ?.addEventListener("keydown", (event) => {
          const key = (event as KeyboardEvent).key;
          const index = tabs.findIndex(
            (tab) => tab.getAttribute("aria-selected") === "true",
          );
          const next = {
            ArrowRight: index + 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: tabs.length - 1,
          }[key];
          if (next === undefined) return;
          event.preventDefault();
          choose(
            tabs[(next + tabs.length) % tabs.length]!.dataset.value!,
            true,
          );
        });
    }),
);
