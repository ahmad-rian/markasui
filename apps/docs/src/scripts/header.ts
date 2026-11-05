import { onPageLoad } from "./lifecycle";
import { setTheme } from "./prefs";

const drawer = () => document.querySelector<HTMLDialogElement>("[data-drawer]");

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("[data-theme-toggle]")) {
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark",
    );
  }
  if (target.closest("[data-drawer-open]")) drawer()?.showModal();
  const dialog = drawer();
  if (dialog?.open && (target === dialog || target.closest("[data-drawer] a")))
    dialog.close();
});

// Drawer tidak boleh tetap terbuka setelah pindah halaman.
onPageLoad(() => drawer()?.close());
