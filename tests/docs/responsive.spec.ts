import { expect, test, type Page } from "@playwright/test";

/**
 * Tata letak responsif: halaman tidak melebar ke samping dan teks tidak terpotong di tengah kata
 * (seperti nama prop "descri / ption" di tabel props). Satu muat per halaman, lalu viewport diubah.
 */
const WIDTHS = [360, 768, 1280] as const;

const PAGES = [
  "/",
  "/id",
  "/components",
  "/components/footer",
  "/components/navbar",
  "/components/data-table",
  "/components/modal",
  "/id/components/bottom-navigation",
  "/docs/installation",
  "/docs/mcp",
  "/docs/skills",
  "/docs/livewire",
  "/templates",
  "/templates/larisa",
  "/pages",
  "/pages/belajar",
  "/frameworks/react",
  "/404",
];

/** Wadah yang memang boleh digeser atau memotong isinya, plus teks yang tidak tampil. */
const EXEMPT =
  "pre, [data-code-block], [data-preview], .sr-only, [hidden], dialog:not([open])";

interface Problem {
  kind: "overflow" | "edge" | "word-break";
  where: string;
  detail: string;
}

/** Berjalan di browser: kembalikan daftar masalah tata letak pada viewport saat ini. */
function findProblems(exempt: string): Problem[] {
  const width = innerWidth;
  const problems: Problem[] = [];
  const describe = (el: Element) => {
    const parts: string[] = [];
    for (
      let node: Element | null = el, i = 0;
      node && i < 3;
      node = node.parentElement, i++
    ) {
      const classes = [...node.classList]
        .filter((c) => !/[:[]/.test(c))
        .slice(0, 2);
      parts.unshift([node.tagName.toLowerCase(), ...classes].join("."));
    }
    return parts.join(" > ");
  };
  // Leluhur dengan overflow selain visible (wadah geser, bingkai preview) menahan isinya sendiri.
  const contained = (el: Element) => {
    for (
      let p = el.parentElement;
      p && p !== document.body;
      p = p.parentElement
    ) {
      if (getComputedStyle(p).overflowX !== "visible") return true;
    }
    return false;
  };

  const scrollWidth = document.documentElement.scrollWidth;
  if (scrollWidth > width + 1)
    problems.push({
      kind: "overflow",
      where: "html",
      detail: `scrollWidth ${scrollWidth} > ${width}`,
    });

  const reported = new Set<Element>();
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest(exempt) || (el.closest("svg") && el.tagName !== "svg"))
      continue;
    const box = el.getBoundingClientRect();
    if (
      !box.width ||
      !box.height ||
      box.right <= width + 1 ||
      box.left >= width
    )
      continue;
    if (getComputedStyle(el).visibility === "hidden" || contained(el)) continue;
    reported.add(el);
    if (el.parentElement && reported.has(el.parentElement)) continue;
    problems.push({
      kind: "edge",
      where: describe(el),
      detail: `right ${Math.round(box.right)} > ${width}`,
    });
  }

  // Satu token tanpa spasi yang tampil di dua baris, patah di tengah huruf (bukan setelah - / . dsb.).
  const range = document.createRange();
  const lines = (node: Text, start: number, end: number) => {
    range.setStart(node, start);
    range.setEnd(node, end);
    const tops: number[] = [];
    for (const rect of range.getClientRects())
      if (
        rect.width >= 1 &&
        !tops.some((top) => Math.abs(top - rect.top) < rect.height / 2)
      )
        tops.push(rect.top);
    return tops;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (
    let node = walker.nextNode() as Text | null;
    node;
    node = walker.nextNode() as Text | null
  ) {
    const parent = node.parentElement;
    if (!parent || parent.closest(`${exempt}, script, style, template`))
      continue;
    for (const match of node.data.matchAll(/\S{4,}/g)) {
      const start = match.index;
      const first = lines(node, start, start + match[0].length);
      if (first.length < 2) continue;
      const at = [...match[0]].findIndex(
        (_, i) =>
          i > 0 &&
          Math.abs(
            (lines(node, start + i, start + i + 1)[0] ?? first[0]!) - first[0]!,
          ) > 2,
      );
      if (
        at < 1 ||
        /[-/.,_:?&=@\\(]/.test(match[0][at - 1]!) ||
        /[A-Z([{<]/.test(match[0][at]!)
      )
        continue;
      problems.push({
        kind: "word-break",
        where: describe(parent),
        detail: `${match[0].slice(0, at)} | ${match[0].slice(at)}`,
      });
    }
  }
  return problems;
}

async function settle(page: Page) {
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("markas-splash", "1"));
});

for (const path of PAGES) {
  test(`${path} rapi di ${WIDTHS.join("/")} px`, async ({ page }) => {
    await page.setViewportSize({ width: WIDTHS[0], height: 800 });
    await page.goto(path);
    // content-visibility: auto memberi kotak perkiraan untuk section di luar layar; ukur yang asli.
    await page.addStyleTag({
      content: "* { content-visibility: visible !important; }",
    });
    const found: string[] = [];
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      await settle(page);
      const problems = await page.evaluate(findProblems, EXEMPT);
      found.push(
        ...problems.map(
          (p) => `${width}px ${p.kind}: ${p.where} (${p.detail})`,
        ),
      );
    }
    expect(found).toEqual([]);
  });
}

/** Komponen yang lebarnya tetap (island 22rem, dock tujuh ikon) harus muat di bingkai preview 360 px. */
const NARROW_PREVIEWS = [
  "/components/dynamic-island",
  "/components/dock",
  "/components/expandable-card",
  "/components/navbar",
];

for (const path of NARROW_PREVIEWS) {
  test(`${path}: isi preview muat di 360 px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path);
    await page.addStyleTag({
      content: "* { content-visibility: visible !important; }",
    });
    await settle(page);
    // Bingkai tidak boleh bergeser ke samping, dan tidak ada kontrol yang terpotong tepi bingkai.
    const clipped = await page.evaluate(() => {
      const found: string[] = [];
      for (const panel of document.querySelectorAll<HTMLElement>(
        "[data-preview] > .frame-panel",
      )) {
        if (!panel.offsetParent) continue;
        const name =
          panel.closest<HTMLElement>("[data-variant]")?.dataset.variant ??
          "utama";
        if (panel.scrollWidth > panel.clientWidth + 1)
          found.push(`${name} +${panel.scrollWidth - panel.clientWidth}px`);
        const frame = panel.getBoundingClientRect();
        for (const control of panel.querySelectorAll("a[href], button")) {
          const box = control.getBoundingClientRect();
          if (!box.width || getComputedStyle(control).visibility === "hidden")
            continue;
          if (box.left < frame.left - 1 || box.right > frame.right + 1)
            found.push(
              `${name}: ${control.textContent?.trim() || control.getAttribute("aria-label")}`,
            );
        }
      }
      return found;
    });
    expect(clipped).toEqual([]);
  });
}

/** Token mirip kode di deskripsi prop dan catatan aksesibilitas (`"{index}`, `-cards`, `let-item`) tidak patah. */
const CODE_TOKEN = String.raw`^(?:-\w|\S*(?:[{}<>="]|\w-\w))\S*$`;

for (const [path, width] of [
  ["/id/components/carousel", 768],
  ["/components/card-stack", 390],
] as const) {
  test(`${path}: token kode di tabel props utuh di ${width} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(path);
    await page.addStyleTag({
      content: "* { content-visibility: visible !important; }",
    });
    await settle(page);
    const split = await page.evaluate((source) => {
      const code = new RegExp(source);
      const range = document.createRange();
      const cells = document.querySelectorAll(
        ".props-table td:last-child, #aksesibilitas + ul li",
      );
      const broken: string[] = [];
      for (const cell of cells) {
        const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? "";
          for (const match of text.matchAll(/\S+/g)) {
            if (!code.test(match[0])) continue;
            range.setStart(node, match.index);
            range.setEnd(node, match.index + match[0].length);
            const tops = new Set(
              [...range.getClientRects()]
                .filter((rect) => rect.width >= 1)
                .map((rect) => Math.round(rect.top)),
            );
            if (tops.size > 1) broken.push(match[0]);
          }
        }
      }
      return broken;
    }, CODE_TOKEN);
    expect(split).toEqual([]);
  });
}

test("tab dan link sumber template minimal 24 px di ponsel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const small = async () =>
    page.evaluate(() =>
      [
        ...document.querySelectorAll(
          "[data-docs-tabs] [role=tab], main a[href*='/tree/main/templates/']",
        ),
      ]
        .filter((el) => el instanceof HTMLElement && el.offsetParent)
        .map(
          (el) => [el.textContent?.trim(), el.getBoundingClientRect()] as const,
        )
        .filter(([, box]) => box.width < 24 || box.height < 24)
        .map(
          ([label, box]) =>
            `${label} ${Math.round(box.width)}x${Math.round(box.height)}`,
        ),
    );
  await page.goto("/components/carousel");
  expect(await small()).toEqual([]);
  await page.goto("/templates/larisa");
  expect(await small()).toEqual([]);
});
