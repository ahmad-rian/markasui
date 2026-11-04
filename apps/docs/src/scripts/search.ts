import { onPageLoad } from "./lifecycle";

type PagefindResult = {
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string };
  }>;
};
type Pagefind = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

const MAX_RESULTS = 8;
const DEBOUNCE_MS = 120;

let pagefind: Promise<Pagefind | null> | undefined;

/** Index Pagefind dibuat setelah build, jadi hanya tersedia di hasil build (bukan astro dev). */
const loadPagefind = () =>
  (pagefind ??= (
    import(
      /* @vite-ignore */ `${location.origin}/pagefind/pagefind.js`
    ) as Promise<Pagefind>
  ).catch(() => null));

const escapeText = (text: string) =>
  text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const elements = () => ({
  dialog: document.querySelector<HTMLDialogElement>("[data-search-dialog]"),
  input: document.querySelector<HTMLInputElement>("[data-search-input]"),
  status: document.querySelector<HTMLElement>("[data-search-status]"),
  list: document.querySelector<HTMLUListElement>("[data-search-results]"),
});

function open() {
  const { dialog, input } = elements();
  if (!dialog || !input || dialog.open) return;
  dialog.showModal();
  input.select();
  void loadPagefind();
}

async function run(query: string) {
  const { status, list } = elements();
  if (!status || !list) return;
  if (!query) {
    list.innerHTML = "";
    status.textContent = "Ketik untuk mencari";
    return;
  }
  const engine = await loadPagefind();
  if (!engine) {
    status.textContent = "Pencarian tersedia setelah situs dibangun";
    return;
  }
  const { results } = await engine.search(query);
  const items = await Promise.all(
    results.slice(0, MAX_RESULTS).map((result) => result.data()),
  );
  status.textContent = items.length
    ? `${items.length} hasil`
    : "Tidak ada hasil";
  list.innerHTML = items
    .map(
      (
        item,
      ) => `<li><a href="${escapeText(item.url.replace(/\.html$/, ""))}" class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-subtle focus-visible:bg-subtle">
        <span class="block text-sm font-medium text-ink">${escapeText(item.meta.title ?? item.url)}</span>
        <span class="mt-0.5 block text-[13px] leading-5 text-muted [&_mark]:bg-primary-soft [&_mark]:text-ink">${item.excerpt}</span>
      </a></li>`,
    )
    .join("");
}

let timer: ReturnType<typeof setTimeout> | undefined;

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open();
  }
});
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("[data-search-open]")) open();
  const { dialog } = elements();
  if (dialog && target === dialog) dialog.close();
  // Pilih hasil: tutup dialog sebelum router pindah halaman.
  if (target.closest("[data-search-results] a")) dialog?.close();
});
document.addEventListener("input", (event) => {
  if (!(event.target as HTMLElement).matches("[data-search-input]")) return;
  clearTimeout(timer);
  const value = (event.target as HTMLInputElement).value.trim();
  timer = setTimeout(() => void run(value), DEBOUNCE_MS);
});

// Tampilkan pintasan sesuai platform.
onPageLoad(() => {
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  document
    .querySelectorAll<HTMLElement>("[data-shortcut-mod]")
    .forEach((el) => (el.textContent = isMac ? "⌘" : "Ctrl"));
});
