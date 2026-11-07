import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/** Semua halaman komponen dari registry hasil build, plus halaman utama dan docs. */
const componentNames: string[] = JSON.parse(
  readFileSync(
    resolve(import.meta.dirname, "../../apps/docs/dist/r/index.json"),
    "utf8",
  ),
).map((item: { name: string }) => item.name);

const PAGES = [
  "/",
  "/id",
  "/components",
  "/id/components",
  "/docs/installation",
  "/id/docs/installation",
  "/docs/theming",
  "/id/components/modal",
  "/templates",
  "/templates/larisa",
  "/id/templates/lumen",
  ...componentNames.map((name) => `/components/${name}`),
];

test.beforeEach(async ({ page }, testInfo) => {
  if (!testInfo.title.includes("splash")) {
    await page.addInitScript(() =>
      sessionStorage.setItem("markas-splash", "1"),
    );
  }
});

const preview = (page: Page) => page.locator("[data-preview]").first();
const pane = (page: Page, framework: string) =>
  preview(page).locator(`[data-fw="${framework}"]`);

/** Island Astro menghapus atribut ssr setelah hydrate. Klik sebelum itu tidak berefek. */
async function waitInteractive(page: Page, framework: string) {
  if (framework === "blade") return;
  await expect(pane(page, framework).locator("astro-island[ssr]")).toHaveCount(
    0,
  );
}

for (const path of PAGES) {
  for (const theme of ["light", "dark"] as const) {
    test(`${path} (${theme}) lolos axe-core @mobile`, async ({ page }) => {
      // Tema dipilih eksplisit: tanpa preferensi tersimpan landing gelap dan halaman lain terang.
      await page.addInitScript(
        (value) => localStorage.setItem("markas-theme", value),
        theme,
      );
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        violations.map(
          (v) =>
            `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
        ),
      ).toEqual([]);
    });
  }
}

test("switcher framework berlaku global dan tersimpan", async ({ page }) => {
  await page.goto("/components/tabs");
  await expect(pane(page, "blade")).toBeVisible();
  await expect(pane(page, "react")).toBeHidden();

  await page.getByRole("radio", { name: "Vue" }).first().click();
  await expect(pane(page, "vue")).toBeVisible();
  await expect(
    page.locator('[data-fw="vue"] [data-code-block]').first(),
  ).toContainText("@/components/markas/Tabs.vue");

  await page.goto("/components/button");
  await expect(page.locator("html")).toHaveAttribute("data-framework", "vue");
  await expect(
    page.getByRole("radio", { name: "Vue" }).first(),
  ).toHaveAttribute("aria-checked", "true");
});

for (const framework of ["blade", "react", "vue"] as const) {
  test(`preview ${framework} interaktif dan bisa dimuat ulang`, async ({
    page,
  }) => {
    await page.goto("/components/tabs");
    await page
      .getByRole("radio", {
        name: framework[0]!.toUpperCase() + framework.slice(1),
      })
      .first()
      .click();
    const stage = pane(page, framework);
    await waitInteractive(page, framework);

    await stage.getByRole("tab", { name: "Password" }).click();
    await expect(stage.getByRole("tab", { name: "Password" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await preview(page).getByRole("button", { name: "Reload preview" }).click();
    const fresh = pane(page, framework);
    await waitInteractive(page, framework);
    await expect(fresh.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await fresh.getByRole("tab", { name: "Notifications" }).click();
    await expect(
      fresh.getByRole("tab", { name: "Notifications" }),
    ).toHaveAttribute("aria-selected", "true");
  });
}

test("modal di preview Blade terbuka dan tertutup", async ({ page }) => {
  await page.goto("/components/modal");
  await page.getByRole("radio", { name: "Blade" }).first().click();
  await pane(page, "blade")
    .getByRole("button", { name: "Delete project" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Delete project?" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Delete project?" }),
  ).toBeHidden();
});

test("Copy prompt mengikuti framework terpilih", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/components/button");
  await page.getByRole("radio", { name: "React" }).first().click();
  await page.getByRole("button", { name: "More options" }).click();
  await page.getByRole("menuitem", { name: "Copy prompt" }).click();
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toContain(
    "Add the Button component from MarkasUI to my React project.",
  );
  expect(prompt).toContain("src/components/markas/Button.tsx");
  expect(prompt).toContain("export function Button");
});

test("pencarian Ctrl+K menemukan komponen", async ({ page }) => {
  await page.goto("/docs/introduction");
  await page.keyboard.press("Control+k");
  await page.getByLabel("Search query").fill("accordion");
  await expect(page.locator("[data-search-results] a").first()).toHaveAttribute(
    "href",
    /\/components\/accordion/,
  );
});

test("filter halaman komponen", async ({ page, request }) => {
  const index: { name: string; category: string }[] = await (
    await request.get("/r/index.json")
  ).json();
  await page.goto("/components");
  await expect(page.locator("[data-card]:visible")).toHaveCount(index.length);

  await page.getByLabel("Search components").fill("accordion");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.getByLabel("Search components").fill("tidak-ada-komponen-ini");
  await expect(page.getByText("No matching components.")).toBeVisible();

  await page.getByLabel("Search components").fill("");
  await page.getByLabel("Category").selectOption("form");
  const formCount = index.filter((item) => item.category === "form").length;
  await expect(page.locator("[data-card]:visible")).toHaveCount(formCount);
});

test("versi Markdown, llms.txt, dan registry tersedia", async ({ request }) => {
  const md = await request.get("/components/button.md");
  expect(md.headers()["content-type"]).toContain("text/markdown");
  expect(await md.text()).toContain("# Button");

  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toContain("/components/modal.md");

  const index = await (await request.get("/r/index.json")).json();
  expect(index.map((item: { name: string }) => item.name)).toContain("tabs");
});

test("menu mobile membuka drawer @mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "khusus mobile");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const drawer = page.getByRole("dialog", { name: "Navigation" });
  await expect(drawer).toBeVisible();
  await drawer.getByRole("link", { name: "Modal" }).click();
  await expect(page).toHaveURL(/\/components\/modal/);
  await expect(drawer).toBeHidden();
});

test.describe("navigasi SPA", () => {
  test("pindah halaman tanpa reload, tema dan framework tetap", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(
      () => ((window as unknown as { __spa: number }).__spa = 1),
    );
    await page
      .getByRole("button", { name: "Toggle light or dark theme" })
      .click();
    const dark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    await page.getByRole("radio", { name: "Vue" }).first().click();

    await page.getByRole("link", { name: "Browse components" }).click();
    await expect(page).toHaveURL(/\/components$/);
    await page.locator('main a[href="/components/tabs"]').first().click();
    await expect(page).toHaveURL(/\/components\/tabs$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tabs" }),
    ).toBeVisible();

    expect(
      await page.evaluate(
        () => (window as unknown as { __spa?: number }).__spa,
      ),
    ).toBe(1);
    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      ),
    ).toBe(dark);
    await expect(page.locator("html")).toHaveAttribute("data-framework", "vue");

    // Island di halaman baru hydrate dan interaktif.
    await waitInteractive(page, "vue");
    await pane(page, "vue").getByRole("tab", { name: "Password" }).click();
    await expect(
      pane(page, "vue").getByRole("tab", { name: "Password" }),
    ).toHaveAttribute("aria-selected", "true");
  });

  test("preview Blade dengan Alpine tetap jalan setelah navigasi", async ({
    page,
  }) => {
    await page.goto("/docs/introduction");
    await page.evaluate(
      () => ((window as unknown as { __spa: number }).__spa = 1),
    );
    await page.locator('aside a[href="/components/modal"]').click();
    await expect(page).toHaveURL(/\/components\/modal$/);
    await page.getByRole("radio", { name: "Blade" }).first().click();
    await pane(page, "blade")
      .getByRole("button", { name: "Delete project" })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Delete project?" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => (window as unknown as { __spa?: number }).__spa,
      ),
    ).toBe(1);
  });

  test("pencarian, tab instalasi, dan Copy page bekerja setelah navigasi", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page
      .getByRole("link", { name: "Components", exact: true })
      .first()
      .click();
    await page.locator('main a[href="/components/button"]').first().click();
    await expect(page).toHaveURL(/\/components\/button$/);

    await page.getByRole("tab", { name: "pnpm" }).first().click();
    await expect(
      page.getByText("pnpm dlx markasui@latest add button"),
    ).toBeVisible();

    await page.getByRole("button", { name: "Copy page" }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      "# Button",
    );

    await page.keyboard.press("Control+k");
    await page.getByLabel("Search query").fill("accordion");
    await page.locator("[data-search-results] a").first().click();
    await expect(page).toHaveURL(/\/components\/accordion$/);
  });
});

test.describe("bahasa", () => {
  test("Inggris default, Indonesia di /id, switcher ke halaman yang sama", async ({
    page,
  }) => {
    await page.goto("/components/modal");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { level: 2, name: "Accessibility" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Bahasa Indonesia" }).first().click();
    await expect(page).toHaveURL(/\/id\/components\/modal$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
    await expect(
      page.getByRole("heading", { level: 2, name: "Aksesibilitas" }),
    ).toBeVisible();
    await expect(
      page.getByText("Dialog modal berbasis elemen dialog native").first(),
    ).toBeVisible();

    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/components\/modal$/);
  });

  test("Copy prompt di /id berbahasa Indonesia", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/id/components/button");
    await page.getByRole("radio", { name: "Vue" }).first().click();
    await page.getByRole("button", { name: "Opsi lain" }).click();
    await page.getByRole("menuitem", { name: "Copy prompt" }).click();
    const prompt = await page.evaluate(() => navigator.clipboard.readText());
    expect(prompt).toContain(
      "Tambahkan komponen Button dari MarkasUI ke project Vue saya.",
    );
    expect(prompt).toContain("/id/docs/installation");
  });

  test("docs, Markdown, dan llms.txt tersedia di kedua bahasa", async ({
    page,
    request,
  }) => {
    await page.goto("/id/docs/cli");
    await expect(
      page.getByRole("heading", { level: 1, name: "CLI" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Tambahkan komponen MarkasUI ke project lewat npx markasui.",
      ),
    ).toBeVisible();

    expect(
      await (await request.get("/id/components/modal.md")).text(),
    ).toContain("## Aksesibilitas");
    expect(await (await request.get("/components/modal.md")).text()).toContain(
      "## Accessibility",
    );
    expect(await (await request.get("/id/llms.txt")).text()).toContain(
      "/id/components/modal.md",
    );
  });
});

test.describe("blok kode", () => {
  test("setiap blok kode di docs punya tombol salin yang bekerja", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/installation");
    const blocks = page.locator("main [data-code-block]");
    const count = await blocks.count();
    expect(count).toBeGreaterThan(5);
    await expect(
      page.locator("main [data-code-block] [data-copy]"),
    ).toHaveCount(count);

    await blocks.nth(1).getByRole("button", { name: "Copy code" }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "npm install tailwindcss @tailwindcss/vite alpinejs",
    );
  });

  test("kode diwarnai Shiki", async ({ page }) => {
    await page.goto("/docs/installation");
    const keyword = page
      .locator("main pre span", { hasText: "import" })
      .first();
    expect(await keyword.evaluate((el) => getComputedStyle(el).color)).not.toBe(
      await page
        .locator("main p")
        .first()
        .evaluate((el) => getComputedStyle(el).color),
    );
  });

  test("label tombol salin di /id berbahasa Indonesia", async ({ page }) => {
    await page.goto("/id/docs/installation");
    await expect(page.locator("main [data-copy]").first()).toHaveAttribute(
      "aria-label",
      "Salin kode",
    );
  });

  test("halaman docs punya Copy page, versi Markdown, dan navigasi", async ({
    page,
    context,
    request,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/installation");
    await page.getByRole("button", { name: "Copy page" }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      "# Installation",
    );
    await page.getByRole("button", { name: "More options" }).click();
    await expect(
      page.getByRole("menuitem", { name: "Copy prompt" }),
    ).toHaveCount(0);
    await page.keyboard.press("Escape");

    await page.getByRole("link", { name: "Next: Theming" }).click();
    await expect(page).toHaveURL(/\/docs\/theming$/);
    expect(await (await request.get("/docs/installation.md")).text()).toContain(
      "# Installation",
    );
  });
});

test("ganti bahasa menampilkan overlay transisi lalu menutupnya", async ({
  page,
}) => {
  await page.goto("/components/modal");
  const overlay = page.locator("[data-language-overlay]");
  await expect(overlay).toBeHidden();

  await page.getByRole("link", { name: "Bahasa Indonesia" }).first().click();
  await expect(overlay).toBeVisible();
  await expect(overlay.getByText("Beralih ke Bahasa Indonesia")).toBeVisible();

  await expect(page).toHaveURL(/\/id\/components\/modal$/);
  await expect(overlay).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("ganti bahasa di landing memindah status aktif switcher", async ({
  page,
}) => {
  await page.goto("/");
  const switcher = page.locator("header a[data-lang-switch]:visible");
  await expect(switcher.filter({ hasText: "en" })).toHaveAttribute(
    "aria-current",
    "true",
  );

  await page.getByRole("link", { name: "Bahasa Indonesia" }).first().click();
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(switcher.filter({ hasText: "id" })).toHaveAttribute(
    "aria-current",
    "true",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pasang komponen",
  );
});

test("posisi gulir sidebar docs tetap setelah pindah halaman", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "sidebar docs hanya tampil di desktop");
  await page.goto("/components/button");
  const sidebar = page.locator("[data-docs-sidebar]");
  const link = sidebar.getByRole("link", { name: "Tooltip", exact: true });
  await link.scrollIntoViewIfNeeded();
  const before = await sidebar.evaluate((element) => element.scrollTop);
  expect(before).toBeGreaterThan(0);
  await link.click();
  await expect(page).toHaveURL(/\/components\/tooltip$/);
  await expect
    .poll(() => sidebar.evaluate((element) => element.scrollTop))
    .toBe(before);
});

test("warna aksen template diteruskan ke pratinjau", async ({ page }) => {
  await page.goto("/templates/larisa");
  const frame = page.frameLocator("[data-template-frame]");
  await expect(frame.locator("body")).toBeVisible();

  await page.getByRole("radio", { name: "Blue" }).click();
  await expect(page.getByRole("radio", { name: "Blue" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await expect(frame.locator("html")).toHaveAttribute("data-accent", "blue");
  await expect(page.locator("[data-template-open]")).toHaveAttribute(
    "href",
    /accent=blue/,
  );
});

test("splash tampil sekali per sesi di landing lalu hilang", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  // Hapus penanda dari beforeEach hanya untuk pemuatan pertama, supaya reload menguji "sekali per sesi".
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("markas-splash-test")) {
      sessionStorage.setItem("markas-splash-test", "1");
      sessionStorage.removeItem("markas-splash");
    }
  });
  // Splash hanya sekitar 1,9 detik; jangan tunggu event load sebelum memeriksanya.
  await page.goto("/", { waitUntil: "commit" });
  const splash = page.locator("div[data-splash]");
  await expect(splash).toBeVisible();
  await expect(splash).toBeHidden({ timeout: 4000 });
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute("data-splash", /.*/);
});

test.describe("playground props", () => {
  for (const framework of ["Blade", "React", "Vue"] as const) {
    test(`Button ${framework}: kontrol mengubah preview dan kode`, async ({
      page,
    }) => {
      await page.goto("/components/button");
      await page.getByRole("radio", { name: framework }).first().click();
      const fw = framework.toLowerCase();
      if (fw !== "blade")
        await expect(
          page.locator(`[data-playground] [data-fw="${fw}"] astro-island[ssr]`),
        ).toHaveCount(0);

      await page.getByLabel("variant", { exact: true }).selectOption("danger");
      await page.getByLabel("disabled", { exact: true }).check();

      const button = page
        .locator(`[data-playground] [data-fw="${fw}"] button:visible`)
        .first();
      await expect(button).toHaveClass(/bg-danger/);
      await expect(button).toBeDisabled();
      const code = page
        .locator(
          `[data-playground] [data-fw="${fw}"] [data-combo]:not([hidden]) pre`,
        )
        .last();
      await expect(code).toContainText('variant="danger"');
      await expect(code).toContainText("disabled");
    });
  }

  test("komponen tanpa playground menampilkan kode contoh, source ada di tab Manual", async ({
    page,
  }) => {
    await page.goto("/components/modal");
    await page.getByRole("radio", { name: "React" }).first().click();
    await expect(
      page.locator('[data-fw="react"] [data-code-block]').first(),
    ).toContainText("export default function ModalExample");
    await page.getByRole("tab", { name: "Manual" }).click();
    await expect(
      page.getByText("src/components/markas/Modal.tsx").first(),
    ).toBeVisible();
  });
});

test("splash tidak tampil saat prefers-reduced-motion", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.removeItem("markas-splash"));
  await page.goto("/");
  await expect(page.locator("div[data-splash]")).toBeHidden();
});

test("tidak ada overflow horizontal di layar sempit, termasuk tab Manual @mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "khusus mobile");
  test.setTimeout(120_000);
  const offenders: string[] = [];
  for (const path of PAGES.flatMap((p) =>
    p.startsWith("/components/") ? [p, `/id${p}`] : [p],
  )) {
    await page.goto(path);
    const manual = page.getByRole("tab", { name: "Manual" });
    if (await manual.count()) await manual.first().click();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    );
    if (overflow > 0) offenders.push(`${path}: ${overflow}px`);
  }
  expect(offenders).toEqual([]);
});

test.describe("kata framework di judul landing", () => {
  const rotator = (page: Page) => page.locator("[data-hero-rotator]");
  const ROTATION_WAIT_MS = 3000;

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
  });

  test("preferensi tersimpan langsung tampil dan tidak berputar", async ({
    page,
  }) => {
    await page.addInitScript(() =>
      localStorage.setItem("markas-framework", "vue"),
    );
    await page.goto("/");
    await expect(rotator(page)).toHaveAttribute("data-active", "vue");
    await expect(rotator(page).locator('[data-word="vue"]')).toHaveCSS(
      "opacity",
      "1",
    );
    await page.waitForTimeout(ROTATION_WAIT_MS);
    await expect(rotator(page)).toHaveAttribute("data-active", "vue");
  });

  test("tanpa preferensi berputar, memilih di pill mengganti kata dan menghentikan putaran", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(rotator(page)).toHaveAttribute("data-active", "blade");
    await expect(rotator(page)).toHaveAttribute("data-active", "react", {
      timeout: 4000,
    });

    await page.getByRole("radio", { name: "Vue" }).first().click();
    await expect(rotator(page)).toHaveAttribute("data-active", "vue");
    await expect(rotator(page).locator('[data-word="vue"]')).toHaveCSS(
      "opacity",
      "1",
    );
    await page.waitForTimeout(ROTATION_WAIT_MS);
    await expect(rotator(page)).toHaveAttribute("data-active", "vue");
  });

  test("tetap sinkron setelah navigasi SPA", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(
      () => ((window as unknown as { __spa: number }).__spa = 1),
    );
    await page.getByRole("link", { name: "Browse components" }).click();
    await expect(page).toHaveURL(/\/components$/);
    await page.locator('main a[href="/components/tabs"]').first().click();
    await expect(page).toHaveURL(/\/components\/tabs$/);
    await page.getByRole("radio", { name: "React" }).first().click();

    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/);
    await expect(rotator(page)).toHaveAttribute("data-active", "react");
    await page.waitForTimeout(ROTATION_WAIT_MS);
    await expect(rotator(page)).toHaveAttribute("data-active", "react");
    expect(
      await page.evaluate(
        () => (window as unknown as { __spa?: number }).__spa,
      ),
    ).toBe(1);
  });
});

test.describe("tema landing", () => {
  test("tanpa preferensi landing gelap, halaman lain terang, termasuk lewat navigasi SPA", async ({
    page,
  }) => {
    const html = page.locator("html");
    await page.goto("/");
    await expect(html).toHaveClass(/\bdark\b/);

    await page.getByRole("link", { name: "Browse components" }).click();
    await expect(page).toHaveURL(/\/components$/);
    await expect(html).not.toHaveClass(/\bdark\b/);

    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/);
    await expect(html).toHaveClass(/\bdark\b/);

    await page.goto("/docs/installation");
    await expect(html).not.toHaveClass(/\bdark\b/);
  });

  test("pilihan tema tersimpan berlaku juga di landing", async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem("markas-theme", "light"),
    );
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
  });

  test("toggle di header mengganti tampilan hero dan tersimpan", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.locator(".lp-hero");
    const background = () =>
      hero.evaluate((element) => getComputedStyle(element).backgroundColor);
    const dark = await background();

    await page
      .getByRole("button", { name: "Toggle light or dark theme" })
      .click();
    await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
    await expect.poll(background).not.toBe(dark);

    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/\bdark\b/);
  });
});
