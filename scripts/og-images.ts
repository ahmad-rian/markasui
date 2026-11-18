/**
 * Gambar Open Graph 1200x630 untuk setiap jenis halaman docs, plus ikon aplikasi (apple-touch-icon,
 * icon-192, icon-512) dari simbol brand. Hasil ditulis ke apps/docs/public/og/ dan apps/docs/public/.
 * Base.astro memilih og/<locale>/<kunci>.png, lalu og/<kunci>.png, lalu og/default.png.
 * Pemakaian: node scripts/og-images.ts   (butuh browser Playwright: pnpm exec playwright install chromium)
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { mkdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";
import { BRAND_SHAPES, BRAND_VIEWBOX } from "../apps/docs/src/lib/brand.ts";
import {
  FRAMEWORK_ICONS,
  FRAMEWORK_LABELS,
} from "../apps/docs/src/lib/frameworks.ts";
import { HUBS } from "../apps/docs/src/lib/hubs.ts";
import { LOCALES, t, type Locale } from "../apps/docs/src/lib/i18n.ts";
import {
  REQUIRED_TEMPLATE_FRAMEWORKS,
  TEMPLATE_FRAMEWORKS,
  templateFilePath,
  type TemplateFramework,
} from "../apps/docs/src/lib/template-frameworks.ts";
import {
  FRAMEWORKS,
  type Framework,
} from "../packages/registry/src/frameworks.ts";

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_BYTES = 60 * 1024;
/** Landing memakai tangkapan hero asli (kaca beralur, gradien): butuh palet penuh, batas lebih longgar. */
const HERO_MAX_BYTES = 250 * 1024;
/** Situs yang hero-nya difoto. Default produksi; isi OG_HERO_URL untuk build lokal (mis. http://localhost:4321). */
const HERO_BASE = process.env.OG_HERO_URL || "https://markas.jenderalcorp.com";
/** Warna PNG berpalet: cukup untuk teks halus di latar polos, jauh lebih kecil dari PNG penuh. */
const PALETTE_COLORS = 96;

const root = resolve(import.meta.dirname, "..");
const docs = join(root, "apps/docs");
const outDir = join(docs, "public/og");
const host = new URL(process.env.SITE_URL || "https://markas.jenderalcorp.com")
  .host;

/** Token mode gelap dari packages/theme/markas.css. */
const COLORS = {
  canvas: "#0e110e",
  line: "#2a302a",
  ink: "#f2f4f1",
  muted: "#a3a9a2",
  faint: "#808780",
};
/** Warna simbol brand di mode gelap (apps/docs/src/styles/global.css). */
const MARK_DARK: Record<string, string> = {
  back: "#3a3f3a",
  upper: "#7a7a7a",
  mint: "#2b4a3b",
  mid: "#4a504a",
  dark: "#b5bab4",
  green: "#49ae7f",
};
/** Warna asli simbol (favicon.svg), untuk ikon di latar terang. */
const MARK_LIGHT: Record<string, string> = {
  back: "#e3e3e3",
  upper: "#7a7a7a",
  mint: "#daefe5",
  mid: "#cbcbcb",
  dark: "#525252",
  green: "#49ae7f",
};

type Card = {
  /** Path file tanpa ekstensi di public/og, misalnya "components/button" atau "id/docs/cli". */
  file: string;
  eyebrow: string;
  title: string;
  description: string;
  frameworks: readonly Framework[];
  /** Framework yang disorot (hub framework). */
  highlight?: Framework;
};

const markSvg = (colors: Record<string, string>, attrs = "") =>
  `<svg viewBox="${BRAND_VIEWBOX}" ${attrs}>${BRAND_SHAPES.map(
    (shape) =>
      `<polygon points="${shape.points}" fill="${colors[shape.tone]}"/>`,
  ).join("")}</svg>`;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(file, "utf8")) as T;

/** Frontmatter sederhana (key: value) dari file Markdown docs. */
function frontmatter(file: string): Record<string, string> {
  const match = /^---\n([\s\S]*?)\n---/.exec(readFileSync(file, "utf8"));
  if (!match) throw new Error(`${file} tidak punya frontmatter`);
  return Object.fromEntries(
    match[1]!.split("\n").flatMap((line) => {
      const index = line.indexOf(":");
      if (index < 0) return [];
      const value = line
        .slice(index + 1)
        .trim()
        .replace(/^"(.*)"$/, "$1");
      return [[line.slice(0, index).trim(), value]];
    }),
  );
}

const localized = (locale: Locale, file: string) =>
  locale === "en" ? file : `${locale}/${file}`;

function componentCards(): Card[] {
  const dir = join(root, "components");
  return readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(join(dir, entry.name, "meta.json")),
    )
    .map((entry) => {
      const meta = readJson<{
        name: string;
        title: string;
        description: string;
        category: keyof ReturnType<typeof t>["categories"];
        frameworks: Partial<Record<Framework, unknown>>;
      }>(join(dir, entry.name, "meta.json"));
      return {
        file: `components/${meta.name}`,
        eyebrow: `Component · ${t("en").categories[meta.category]}`,
        title: meta.title,
        description: meta.description,
        frameworks: FRAMEWORKS.filter((fw) => meta.frameworks[fw]),
      };
    });
}

function docCards(): Card[] {
  return LOCALES.flatMap((locale) => {
    const dir = join(docs, "src/content/docs", locale);
    return readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const data = frontmatter(join(dir, file));
        return {
          file: localized(locale, `docs/${file.replace(/\.md$/, "")}`),
          eyebrow: "Docs",
          title: data.title!,
          description: data.seoDescription ?? data.description!,
          frameworks: FRAMEWORKS,
        };
      });
  });
}

const TEMPLATE_EYEBROWS: Record<
  Locale,
  Record<"dashboard" | "page", string>
> = {
  en: { dashboard: "Dashboard template", page: "Landing page" },
  id: { dashboard: "Template dashboard", page: "Landing page" },
};

/** Template yang tampil di situs (versi wajib lengkap), sama dengan apps/docs/src/lib/templates.ts. */
function templateCards(): Card[] {
  const dir = join(root, "templates");
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .flatMap((slug) => {
      const exists = (fw: TemplateFramework) =>
        existsSync(join(dir, slug, templateFilePath(fw, slug)));
      if (
        !existsSync(join(dir, slug, "meta.json")) ||
        !REQUIRED_TEMPLATE_FRAMEWORKS.every(exists)
      )
        return [];
      const meta = readJson<{
        title: string;
        kind?: string;
        headline: Record<Locale, string>;
        description: Record<Locale, string>;
      }>(join(dir, slug, "meta.json"));
      const page = meta.kind === "page";
      return LOCALES.map((locale) => ({
        file: localized(locale, `${page ? "pages" : "templates"}/${slug}`),
        eyebrow: `${meta.title} · ${TEMPLATE_EYEBROWS[locale][page ? "page" : "dashboard"]}`,
        title: meta.headline[locale],
        description: meta.description[locale],
        frameworks: TEMPLATE_FRAMEWORKS.filter(exists),
      }));
    });
}

function hubCards(count: (fw: Framework) => number): Card[] {
  return LOCALES.flatMap((locale) =>
    FRAMEWORKS.map((framework) => {
      const copy = HUBS[framework].copy[locale];
      return {
        file: localized(locale, `frameworks/${framework}`),
        eyebrow: FRAMEWORK_LABELS[framework],
        title: copy.heading,
        description: copy.description(count(framework)),
        frameworks: FRAMEWORKS,
        highlight: framework,
      };
    }),
  );
}

function indexCards(components: number): Card[] {
  return LOCALES.flatMap((locale) => {
    const strings = t(locale);
    const home = {
      eyebrow: strings.seo.homeEyebrow,
      title: strings.seo.homeTitle.replace(
        /^MarkasUI( by JenderalCorp)? - /,
        "",
      ),
      description: strings.home.description,
      frameworks: FRAMEWORKS,
    };
    return [
      { ...home, file: localized(locale, "home") },
      ...(locale === "en" ? [{ ...home, file: "default" }] : []),
      {
        file: localized(locale, "components"),
        eyebrow: strings.nav.components,
        title: strings.seo.componentsTitle,
        description: strings.list.subtitle(components),
        frameworks: FRAMEWORKS,
      },
      {
        file: localized(locale, "templates"),
        eyebrow: strings.nav.templates,
        title: strings.seo.templatesTitle,
        description: strings.templates.subtitle,
        frameworks: ["blade", "react", "vue"],
      },
      {
        file: localized(locale, "pages"),
        eyebrow: strings.nav.pages,
        title: strings.seo.pagesTitle,
        description: strings.pages.subtitle,
        frameworks: ["blade", "react", "vue"],
      },
    ];
  });
}

function fontFace(family: string, file: string, weight: string) {
  const data = readFileSync(join(docs, "node_modules", file)).toString(
    "base64",
  );
  return `@font-face{font-family:"${family}";src:url(data:font/woff2;base64,${data}) format("woff2");font-weight:${weight};}`;
}

const shell = () => `<!doctype html><html><head><style>
${fontFace("Bricolage Grotesque", "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2", "200 800")}
*{margin:0;box-sizing:border-box}
html,body{width:${WIDTH}px;height:${HEIGHT}px;background:${COLORS.canvas};color:${COLORS.ink};font-family:"Bricolage Grotesque",sans-serif;-webkit-font-smoothing:antialiased}
.card{position:relative;display:flex;flex-direction:column;width:100%;height:100%;padding:64px 72px 56px}
.top{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:16px;font-size:32px;font-weight:600;letter-spacing:-0.02em}
.brand svg{height:44px;width:auto}
.host{font-size:22px;color:${COLORS.faint}}
.body{margin-top:auto;margin-bottom:auto;padding-top:24px}
.eyebrow{font-size:26px;color:${COLORS.muted}}
h1{margin-top:14px;font-size:76px;line-height:1.04;font-weight:600;letter-spacing:-0.035em;max-width:1056px;text-wrap:balance;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
h1.long{font-size:62px}
p{margin-top:22px;font-size:28px;line-height:1.4;color:${COLORS.muted};max-width:980px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.foot{display:flex;align-items:center;gap:28px;padding-top:28px;border-top:1px solid ${COLORS.line};font-size:22px;color:${COLORS.faint}}
.fw{display:flex;align-items:center;gap:10px}
.fw svg{width:24px;height:24px;fill:currentColor}
.fw.on{color:${COLORS.ink}}
.fw.on svg{fill:var(--brand)}
</style></head><body><div class="card" id="card"></div></body></html>`;

function cardHtml(card: Card): string {
  const frameworks = card.frameworks
    .map((fw) => {
      const on = fw === card.highlight;
      return `<span class="fw${on ? " on" : ""}" style="--brand:${FRAMEWORK_ICONS[fw].dark}"><svg viewBox="0 0 24 24"><path d="${FRAMEWORK_ICONS[fw].path}"/></svg>${FRAMEWORK_LABELS[fw]}</span>`;
    })
    .join("");
  const long = card.title.length > 34 ? ' class="long"' : "";
  return `<div class="top"><div class="brand">${markSvg(MARK_DARK)}MarkasUI</div><div class="host">${host}</div></div>
<div class="body"><div class="eyebrow">${escapeHtml(card.eyebrow)}</div><h1${long}>${escapeHtml(card.title)}</h1><p>${escapeHtml(card.description)}</p></div>
<div class="foot">${frameworks}</div>`;
}

async function renderCard(page: Page, card: Card): Promise<number> {
  await page.evaluate((html) => {
    document.getElementById("card")!.innerHTML = html;
  }, cardHtml(card));
  const png = await page.screenshot({ type: "png" });
  const file = join(outDir, `${card.file}.png`);
  await mkdir(dirname(file), { recursive: true });
  await sharp(png)
    .png({
      palette: true,
      colors: PALETTE_COLORS,
      compressionLevel: 9,
      effort: 10,
    })
    .toFile(file);
  const { size } = await stat(file);
  if (size > MAX_BYTES)
    throw new Error(`${file} ${size} byte, lebih dari batas ${MAX_BYTES}`);
  return size;
}

/**
 * Gambar share landing (WhatsApp, X, Slack): foto hero landing sungguhan, bukan kartu teks, karena
 * kaca beralur dan judulnya yang paling mewakili MarkasUI. Splash dan animasi dimatikan.
 */
async function renderHero(page: Page, locale: Locale, files: string[]) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("markas-splash", "1");
    } catch {
      // Tanpa sessionStorage splash tetap tampil sebentar; foto diambil setelah networkidle.
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${HERO_BASE}${locale === "en" ? "/" : `/${locale}`}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => "serif" in document.documentElement.dataset);
  // Baris statistik terpotong di tepi bawah 630 px: disembunyikan supaya bingkai rapi.
  await page.addStyleTag({ content: ".lp-stats{visibility:hidden}" });
  const png = await page.screenshot({ type: "png" });
  for (const name of files) {
    const file = join(outDir, `${name}.png`);
    await mkdir(dirname(file), { recursive: true });
    await sharp(png)
      .png({
        palette: true,
        colors: 256,
        dither: 1,
        compressionLevel: 9,
        effort: 10,
      })
      .toFile(file);
    const { size } = await stat(file);
    if (size > HERO_MAX_BYTES)
      throw new Error(
        `${file} ${size} byte, lebih dari batas ${HERO_MAX_BYTES}`,
      );
    console.log(`og: ${name} (hero) ${(size / 1024).toFixed(1)} KB`);
  }
}

/** Ikon aplikasi: simbol di latar terang dengan ruang tepi, untuk iOS dan web manifest. */
async function renderIcons() {
  const icon = (size: number, padding: number) =>
    sharp(
      Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" fill="#ffffff"/>${markSvg(
          MARK_LIGHT,
          `x="${padding}" y="${padding}" width="${size - padding * 2}" height="${size - padding * 2}" xmlns="http://www.w3.org/2000/svg"`,
        )}</svg>`,
      ),
    )
      .png({ palette: true, colors: 32, compressionLevel: 9 })
      .toFile(
        join(
          docs,
          "public",
          size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`,
        ),
      );
  // Ruang tepi sekitar 18% supaya simbol tidak terpotong saat ikon dibuat bulat (maskable).
  await Promise.all([icon(180, 28), icon(192, 34), icon(512, 92)]);
}

async function main() {
  const components = componentCards();
  const count = (fw: Framework) =>
    components.filter((card) => card.frameworks.includes(fw)).length;
  const cards = [
    ...indexCards(components.length),
    ...hubCards(count),
    ...docCards(),
    ...templateCards(),
    ...components,
  ];

  await rm(outDir, { recursive: true, force: true });
  await renderIcons();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.setContent(shell());
    await page.evaluate(() => document.fonts.ready);
    let total = 0;
    for (const card of cards) {
      const size = await renderCard(page, card);
      total += size;
      console.log(`og: ${card.file} ${(size / 1024).toFixed(1)} KB`);
    }
    console.log(
      `og: ${cards.length} gambar, rata-rata ${(total / cards.length / 1024).toFixed(1)} KB`,
    );
    const heroPage = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    // Menimpa kartu teks landing yang dibuat di atas.
    await renderHero(heroPage, "en", [localized("en", "home"), "default"]);
    await renderHero(heroPage, "id", [localized("id", "home")]);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(`og: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
