import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const dist = resolve(import.meta.dirname, "../../apps/docs/dist");
const componentNames: string[] = JSON.parse(
  readFileSync(join(dist, "r/index.json"), "utf8"),
).map((item: { name: string }) => item.name);
const FRAMEWORKS = ["blade", "react", "vue", "svelte", "astro", "angular"];

/** Folder hasil build yang bukan halaman konten: iframe demo, snippet, aset, dan indeks pencarian. */
const SKIPPED = /^(demo|snippets|_astro|pagefind|r|angular|og|thumbs)\//;

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

type PageMeta = {
  file: string;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex: boolean;
  jsonLd: string[];
};

const attr = (html: string, pattern: RegExp) => pattern.exec(html)?.[1];

function readPage(file: string): PageMeta {
  const html = readFileSync(file, "utf8");
  return {
    file: relative(dist, file),
    title: attr(html, /<title>([^<]*)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/),
    noindex: /<meta name="robots" content="noindex"/.test(html),
    jsonLd: [
      ...html.matchAll(
        /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].map((match) => match[1]!),
  };
}

const pages = htmlFiles(dist)
  .filter((file) => !SKIPPED.test(relative(dist, file)))
  .map(readPage);
const indexable = pages.filter((page) => !page.noindex);

/** Isi XML dibaca dengan DOMParser milik browser, jadi tidak butuh paket parser tambahan. */
async function parseSitemap(
  xml: string,
  page: import("@playwright/test").Page,
) {
  return page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("sitemap bukan XML");
    return [...doc.getElementsByTagName("url")].map((url) => ({
      loc: url.getElementsByTagName("loc")[0]?.textContent ?? "",
      lastmod: url.getElementsByTagName("lastmod")[0]?.textContent ?? null,
      alternates: [...url.getElementsByTagName("xhtml:link")].map(
        (link) => link.getAttribute("hreflang") ?? "",
      ),
    }));
  }, xml);
}

test("sitemap.xml terbaca dan memuat setiap halaman di kedua bahasa", async ({
  page,
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const urls = await parseSitemap(await response.text(), page);
  const paths = new Set(urls.map((url) => new URL(url.loc).pathname));

  for (const name of componentNames) {
    expect(paths).toContain(`/components/${name}`);
    expect(paths).toContain(`/id/components/${name}`);
  }
  for (const fw of FRAMEWORKS) {
    expect(paths).toContain(`/frameworks/${fw}`);
    expect(paths).toContain(`/id/frameworks/${fw}`);
  }
  for (const path of ["/", "/id", "/components", "/docs/installation"])
    expect(paths).toContain(path);

  for (const url of urls) {
    expect(url.loc).not.toMatch(/\/(demo|snippets)\/|\.(md|txt)$|404/);
    expect(url.alternates.toSorted()).toEqual(["en", "id", "x-default"]);
    if (url.lastmod) expect(url.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
  const button = urls.find((url) => url.loc.endsWith("/components/button"));
  expect(button?.lastmod).toBeTruthy();
});

test("robots.txt mengizinkan semua crawler dan menunjuk sitemap", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Disallow: /demo/");
  expect(body).toContain("Disallow: /snippets/");
  expect(body).toMatch(/^Sitemap: https?:\/\/\S+\/sitemap\.xml$/m);
});

test("setiap halaman punya title, description, canonical, dan og:image yang unik", () => {
  expect(indexable.length).toBeGreaterThan(componentNames.length * 2);
  for (const key of ["title", "description", "canonical"] as const) {
    const seen = new Map<string, string>();
    for (const page of indexable) {
      const value = page[key];
      expect(value, `${page.file} tanpa ${key}`).toBeTruthy();
      expect(
        seen.get(value!),
        `${key} "${value}" dipakai ${page.file} dan ${seen.get(value!)}`,
      ).toBeUndefined();
      seen.set(value!, page.file);
    }
  }
  for (const page of indexable) {
    expect(page.ogImage, `${page.file} tanpa og:image`).toBeTruthy();
    const file = join(dist, new URL(page.ogImage!).pathname);
    expect(existsSync(file), `${page.file}: ${page.ogImage} tidak ada`).toBe(
      true,
    );
  }
});

test("JSON-LD setiap halaman valid, dan halaman di bawah beranda punya BreadcrumbList", () => {
  const roots = new Set(["index.html", "id.html"]);
  for (const page of indexable) {
    const types = page.jsonLd.flatMap((source) => {
      const data = JSON.parse(source) as {
        "@context": string;
        "@graph": { "@type": string | string[] }[];
      };
      expect(data["@context"]).toBe("https://schema.org");
      return data["@graph"].flatMap((node) => node["@type"]);
    });
    if (roots.has(page.file)) {
      expect(types).toEqual(
        expect.arrayContaining([
          "Organization",
          "WebSite",
          "SoftwareSourceCode",
        ]),
      );
    } else {
      expect(types, page.file).toContain("BreadcrumbList");
    }
    if (/^(id\/)?components\/[^/]+\.html$/.test(page.file))
      expect(types).toContain("TechArticle");
    if (
      /^(id\/)?(components|templates|pages)\.html$|frameworks\//.test(page.file)
    )
      expect(types).toContain("CollectionPage");
  }
});

test("404 tidak diindeks", () => {
  const notFound = pages.find((page) => page.file === "404.html");
  expect(notFound?.noindex).toBe(true);
  expect(notFound?.canonical).toBeUndefined();
});

test("hub framework menautkan setiap komponen dengan framework terpilih", async ({
  page,
}) => {
  await page.goto("/frameworks/svelte");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Svelte");
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toContainText("Components");
  const links = page.locator(
    'section[aria-labelledby=components] a[href$="?framework=svelte"]',
  );
  await expect(links).toHaveCount(componentNames.length);

  await links.first().click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-framework",
    "svelte",
  );
  await expect(
    page.getByRole("radio", { name: "Svelte" }).first(),
  ).toHaveAttribute("aria-checked", "true");
});

test("?framework= membuka halaman komponen pada framework itu dan disimpan", async ({
  page,
}) => {
  await page.goto("/components/tabs?framework=angular");
  await expect(page.locator("html")).toHaveAttribute(
    "data-framework",
    "angular",
  );
  await page.goto("/components/button");
  await expect(page.locator("html")).toHaveAttribute(
    "data-framework",
    "angular",
  );
  await page.goto("/components/button?framework=nope");
  await expect(page.locator("html")).toHaveAttribute(
    "data-framework",
    "angular",
  );
});

test("halaman komponen punya breadcrumb dan komponen terkait", async ({
  page,
}) => {
  await page.goto("/components/button");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(
    breadcrumb.getByRole("link", { name: "Components" }),
  ).toHaveAttribute("href", "/components");
  const related = page.locator("section[aria-labelledby=terkait]");
  await expect(related.getByRole("heading")).toHaveText("Related components");
  expect(await related.getByRole("link").count()).toBeGreaterThan(0);

  await page.goto("/id/docs/cli");
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", {
      name: "Docs",
    }),
  ).toHaveAttribute("href", "/id/docs/introduction");
});

test("footer dan /components menautkan hub framework", async ({ page }) => {
  await page.goto("/components");
  for (const nav of [
    page.getByRole("navigation", { name: "Browse by framework" }),
    page.getByRole("navigation", { name: "Frameworks" }),
  ]) {
    for (const fw of FRAMEWORKS)
      await expect(nav.locator(`a[href="/frameworks/${fw}"]`)).toHaveCount(1);
  }
});

for (const path of ["/frameworks/react", "/id/frameworks/blade"]) {
  for (const theme of ["light", "dark"] as const) {
    test(`${path} (${theme}) lolos axe-core @mobile`, async ({ page }) => {
      await page.addInitScript((value) => {
        localStorage.setItem("markas-theme", value);
        sessionStorage.setItem("markas-splash", "1");
      }, theme);
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
