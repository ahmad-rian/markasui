import { expect, test } from "@playwright/test";

/** Copy page di detail template (dashboard) dan welcome page, plus versi Markdown-nya. */
const DETAILS = [
  {
    path: "/templates/larisa",
    title: "Larisa",
    components: "## Components used",
    more: "More options",
  },
  {
    path: "/id/templates/larisa",
    title: "Larisa",
    components: "## Komponen yang dipakai",
    more: "Opsi lain",
  },
  {
    path: "/pages/belajar",
    title: "Belajar",
    components: "## Components used",
    more: "More options",
  },
  {
    path: "/id/pages/belajar",
    title: "Belajar",
    components: "## Komponen yang dipakai",
    more: "Opsi lain",
  },
] as const;

for (const detail of DETAILS) {
  test(`${detail.path} punya menu Copy page yang menyalin Markdown`, async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(detail.path);

    await page.getByRole("button", { name: "Copy page" }).click();
    const markdown = await page.evaluate(() => navigator.clipboard.readText());
    expect(markdown).toContain(`# ${detail.title}`);
    expect(markdown).toContain(detail.components);

    await page.getByRole("button", { name: detail.more }).click();
    const menu = page.getByRole("menu");
    await expect(
      menu.getByRole("menuitem", { name: "Copy prompt" }),
    ).toBeVisible();
    await expect(
      menu.getByRole("menuitem", { name: /Markdown/ }),
    ).toHaveAttribute("href", `${detail.path}.md`);
  });

  test(`${detail.path}.md berisi judul dan daftar komponen`, async ({
    request,
  }) => {
    const response = await request.get(`${detail.path}.md`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("text/markdown");
    const markdown = await response.text();
    expect(markdown).toContain(`# ${detail.title}`);
    expect(markdown).toContain(detail.components);
    const locale = detail.path.startsWith("/id/") ? "/id" : "";
    expect(markdown).toContain(`${locale}/components/modal)`);
    expect(markdown).toContain("npx markasui@latest add ");
    expect(markdown).toContain(
      `/demo/templates/${detail.title.toLowerCase()}/react`,
    );
  });
}

test("Copy prompt template berisi file source dan demo", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/templates/larisa");
  await page.getByRole("button", { name: "More options" }).click();
  await page.getByRole("menuitem", { name: "Copy prompt" }).click();
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toMatch(
    /^Build the Larisa dashboard template from MarkasUI in my \w+ project\./,
  );
  expect(prompt).toContain("https://raw.githubusercontent.com/");
  expect(prompt).toContain("/demo/templates/larisa/");
  expect(prompt).toContain("npx markasui@latest add accordion");
});

test("llms.txt dan llms-full.txt memuat template dan page", async ({
  request,
}) => {
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).toContain("/templates/larisa.md");
  expect(llms).toContain("/pages/belajar.md");
  expect(await (await request.get("/id/llms.txt")).text()).toContain(
    "/id/pages/belajar.md",
  );
  expect(await (await request.get("/llms-full.txt")).text()).toContain(
    "# Larisa",
  );

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/templates/larisa<");
  expect(sitemap).not.toContain(".md<");
});
