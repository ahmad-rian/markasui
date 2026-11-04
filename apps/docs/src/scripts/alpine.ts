import { getFramework } from "./prefs";

let started = false;

async function start() {
  if (started) return;
  started = true;
  const { default: Alpine } = await import("alpinejs");
  Alpine.start();
}

/** Alpine hanya diunduh kalau framework Blade sedang dipilih. */
export function loadAlpineWhenBlade() {
  if (getFramework() === "blade") void start();
  document.addEventListener("markas:framework", (event) => {
    if ((event as CustomEvent).detail === "blade") void start();
  });
}
