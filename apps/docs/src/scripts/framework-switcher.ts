import type { Framework } from "@markasui/registry/frameworks";
import { showFrameworkSplash } from "./framework-splash";
import { onPageLoad } from "./lifecycle";
import { getFramework, isFramework, setFramework } from "./prefs";

/** Pilihan eksplisit pengunjung: simpan, lalu beri tanda kalau framework-nya memang berganti. */
function choose(framework: Framework) {
  if (framework === getFramework()) return;
  setFramework(framework);
  showFrameworkSplash(framework);
}

function sync() {
  const current = getFramework();
  document
    .querySelectorAll<HTMLElement>("[data-framework-switcher] [role=radio]")
    .forEach((radio) => {
      const checked = radio.dataset.value === current;
      radio.setAttribute("aria-checked", String(checked));
      radio.tabIndex = checked ? 0 : -1;
    });
}

const STEPS: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

document.addEventListener("click", (event) => {
  const radio = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-framework-switcher] [role=radio]",
  );
  if (radio && isFramework(radio.dataset.value)) choose(radio.dataset.value);
});
document.addEventListener("keydown", (event) => {
  const group = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-framework-switcher]",
  );
  const step = STEPS[event.key];
  if (!group || !step) return;
  event.preventDefault();
  const radios = [...group.querySelectorAll<HTMLElement>("[role=radio]")];
  const index = radios.findIndex(
    (radio) => radio.getAttribute("aria-checked") === "true",
  );
  const next = radios[(index + step + radios.length) % radios.length]!;
  if (isFramework(next.dataset.value)) choose(next.dataset.value);
  next.focus();
});

document.addEventListener("markas:framework", sync);
onPageLoad(sync);
