import { onPageLoad } from "./lifecycle";
import { getFramework } from "./prefs";

let started: Promise<void> | undefined;

/** Alpine hanya diunduh kalau halaman punya preview Blade dan framework Blade sedang dipilih. */
function startIfNeeded() {
  if (
    started ||
    getFramework() !== "blade" ||
    !document.querySelector("[x-data]")
  )
    return;
  started = import("alpinejs").then(({ default: Alpine }) => Alpine.start());
}

// Alpine mengamati seluruh dokumen, jadi DOM baru setelah navigasi ikut diinisialisasi otomatis.
onPageLoad(startIfNeeded);
document.addEventListener("markas:framework", startIfNeeded);
