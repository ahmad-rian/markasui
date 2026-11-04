import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const PAGES = [
  "/",
  "/components",
  "/components/button",
  "/components/modal",
  "/components/tabs",
  "/docs/installation",
  "/docs/theming",
];

const preview = (page: Page) => page.locator("[data-preview]").first();
const pane = (page: Page, framework: string) =>
  preview(page).locator(`[data-fw="${framework}"]`);

for (const path of PAGES) {
  for (const theme of ["light", "dark"] as const) {
    test(`${path} (${theme}) lolos axe-core @mobile`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
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
  ).toContainText("src/components/markas/Tabs.vue");

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

    await stage.getByRole("tab", { name: "Kata sandi" }).click();
    await expect(
      stage.getByRole("tab", { name: "Kata sandi" }),
    ).toHaveAttribute("aria-selected", "true");

    await preview(page)
      .getByRole("button", { name: "Muat ulang preview" })
      .click();
    const fresh = pane(page, framework);
    await expect(fresh.getByRole("tab", { name: "Akun" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await fresh.getByRole("tab", { name: "Notifikasi" }).click();
    await expect(
      fresh.getByRole("tab", { name: "Notifikasi" }),
    ).toHaveAttribute("aria-selected", "true");
  });
}

test("modal di preview Blade terbuka dan tertutup", async ({ page }) => {
  await page.goto("/components/modal");
  await page.getByRole("radio", { name: "Blade" }).first().click();
  await pane(page, "blade")
    .getByRole("button", { name: "Hapus proyek" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Hapus proyek?" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Hapus proyek?" }),
  ).toBeHidden();
});

test("Copy prompt mengikuti framework terpilih", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/components/button");
  await page.getByRole("radio", { name: "React" }).first().click();
  await page.getByRole("button", { name: "Opsi lain" }).click();
  await page.getByRole("menuitem", { name: "Copy prompt" }).click();
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toContain(
    "Tambahkan komponen Button dari MarkasUI ke project React saya.",
  );
  expect(prompt).toContain("src/components/markas/Button.tsx");
  expect(prompt).toContain("export function Button");
});

test("pencarian Ctrl+K menemukan komponen", async ({ page }) => {
  await page.goto("/docs/introduction");
  await page.keyboard.press("Control+k");
  await page.getByLabel("Kata kunci").fill("dialog");
  await expect(page.locator("[data-search-results] a").first()).toHaveAttribute(
    "href",
    /\/components\/modal/,
  );
});

test("filter halaman komponen", async ({ page }) => {
  await page.goto("/components");
  await page.getByLabel("Cari komponen").fill("tab");
  await expect(page.locator("[data-card]:visible")).toHaveCount(1);
  await page.getByLabel("Cari komponen").fill("");
  await page.getByLabel("Kategori").selectOption("form");
  await expect(page.locator("[data-card]:visible")).toHaveCount(2);
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
  await page.goto("/components/button");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("dialog", { name: "Navigasi docs" }),
  ).toBeVisible();
  await page
    .getByRole("dialog", { name: "Navigasi docs" })
    .getByRole("link", { name: "Modal" })
    .click();
  await expect(page).toHaveURL(/\/components\/modal/);
});
