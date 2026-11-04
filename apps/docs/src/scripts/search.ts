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

export function setupSearch() {
  const dialog = document.querySelector<HTMLDialogElement>(
    "[data-search-dialog]",
  );
  const input = document.querySelector<HTMLInputElement>("[data-search-input]");
  const status = document.querySelector<HTMLElement>("[data-search-status]");
  const list = document.querySelector<HTMLUListElement>(
    "[data-search-results]",
  );
  if (!dialog || !input || !status || !list) return;

  const open = () => {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    void loadPagefind();
  };

  document
    .querySelectorAll("[data-search-open]")
    .forEach((button) => button.addEventListener("click", open));
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  let timer: ReturnType<typeof setTimeout> | undefined;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => void run(input.value.trim()), DEBOUNCE_MS);
  });

  async function run(query: string) {
    if (!query) {
      list!.innerHTML = "";
      status!.textContent = "Ketik untuk mencari.";
      return;
    }
    const engine = await loadPagefind();
    if (!engine) {
      status!.textContent = "Pencarian belum tersedia di mode pengembangan.";
      return;
    }
    const { results } = await engine.search(query);
    const items = await Promise.all(
      results.slice(0, MAX_RESULTS).map((result) => result.data()),
    );
    status!.textContent = items.length
      ? `${items.length} hasil`
      : "Tidak ada hasil.";
    list!.innerHTML = items
      .map(
        (
          item,
        ) => `<li><a href="${escapeText(item.url.replace(/\.html$/, ""))}" class="block rounded-md px-3 py-2 hover:bg-subtle focus-visible:bg-subtle">
          <span class="block text-sm font-medium text-ink">${escapeText(item.meta.title ?? item.url)}</span>
          <span class="block text-xs text-muted [&_mark]:bg-primary-soft [&_mark]:text-ink">${item.excerpt}</span>
        </a></li>`,
      )
      .join("");
  }
}
