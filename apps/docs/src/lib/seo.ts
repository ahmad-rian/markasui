import { FRAMEWORKS, type Framework } from "@markasui/registry/frameworks";
import { FRAMEWORK_LABELS } from "./frameworks";
import { localePath, t, type Locale } from "./i18n";
import { SITE } from "./site";

/** Batas panjang yang masih tampil utuh di hasil pencarian. */
export const TITLE_MAX = 65;
export const DESCRIPTION_MAX = 160;
const TITLE_SUFFIX = ` - ${SITE.name}`;

/** Nama situs ditambahkan di belakang judul hanya kalau masih muat. */
export const withSiteName = (title: string) =>
  title.length + TITLE_SUFFIX.length <= TITLE_MAX
    ? `${title}${TITLE_SUFFIX}`
    : title;

/** Deskripsi dasar ditambah ekor pertama yang masih muat dalam DESCRIPTION_MAX. */
export function fitDescription(base: string, tails: string[]): string {
  const tail = tails.find(
    (candidate) => base.length + 1 + candidate.length <= DESCRIPTION_MAX,
  );
  return tail ? `${base} ${tail}` : base;
}

/** Urutan framework di judul: yang paling banyak dicari lebih dulu. */
const SEARCH_ORDER: readonly Framework[] = [
  "react",
  "vue",
  "blade",
  "svelte",
  "angular",
  "astro",
];

/** "React, Vue, Blade and Svelte" (en) atau "React, Vue, Blade, dan Svelte" (id). */
export function frameworkList(
  frameworks: readonly Framework[],
  locale: Locale,
): string {
  const labels = SEARCH_ORDER.filter((fw) => frameworks.includes(fw)).map(
    (fw) => FRAMEWORK_LABELS[fw],
  );
  if (labels.length < 2) return labels.join("");
  const and = t(locale).seo.and;
  const comma = locale === "id" ? "," : "";
  return `${labels.slice(0, -1).join(", ")}${comma} ${and} ${labels.at(-1)}`;
}

export type Crumb = { name: string; path: string };

/** Jejak dari beranda sampai halaman ini; path tanpa prefix locale. */
export const breadcrumbTrail = (locale: Locale, items: Crumb[]): Crumb[] => [
  { name: t(locale).nav.home, path: "/" },
  ...items,
];

type Node = Record<string, unknown>;

const absolute = (site: URL, locale: Locale, path: string) =>
  new URL(localePath(locale, path), site).toString();

export function breadcrumbList(
  site: URL,
  locale: Locale,
  trail: Crumb[],
): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(site, locale, crumb.path),
    })),
  };
}

const publisher = (site: URL): Node => ({
  "@type": "Organization",
  name: SITE.name,
  url: site.toString(),
});

/** Artikel teknis untuk halaman komponen dan docs. */
export function techArticle(
  site: URL,
  options: {
    url: string;
    headline: string;
    description: string;
    locale: Locale;
    image?: string;
    published?: string;
    modified?: string;
  },
): Node {
  return {
    "@type": "TechArticle",
    headline: options.headline,
    description: options.description,
    url: options.url,
    ...(options.image && { image: options.image }),
    inLanguage: options.locale,
    ...(options.published && { datePublished: options.published }),
    ...((options.modified ?? options.published) && {
      dateModified: options.modified ?? options.published,
    }),
    author: publisher(site),
    publisher: publisher(site),
  };
}

/** Halaman daftar (komponen, template, hub framework) beserta isinya. */
export function collectionPage(
  options: {
    url: string;
    name: string;
    description: string;
    locale: Locale;
  },
  items: { name: string; url: string }[],
): Node {
  return {
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: options.locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

/** Organization, WebSite, dan software untuk landing. */
export function landingGraph(
  site: URL,
  locale: Locale,
  description: string,
): Node[] {
  const home = absolute(site, locale, "/");
  const org = `${site.origin}/#organization`;
  return [
    {
      "@type": "Organization",
      "@id": org,
      name: "CV Jenderal Solusi Digital",
      url: "https://jenderalcorp.com",
      logo: new URL("/icon-512.png", site).toString(),
      sameAs: [SITE.repo],
    },
    {
      "@type": "WebSite",
      "@id": `${site.origin}/#website`,
      name: SITE.name,
      url: home,
      inLanguage: ["en", "id"],
      publisher: { "@id": org },
    },
    {
      "@type": ["SoftwareSourceCode", "SoftwareApplication"],
      name: SITE.name,
      description,
      url: home,
      codeRepository: SITE.repo,
      license: "https://opensource.org/licenses/MIT",
      programmingLanguage: ["TypeScript", "JavaScript", "PHP", "CSS"],
      runtimePlatform: FRAMEWORKS.map((fw) => FRAMEWORK_LABELS[fw]),
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": org },
    },
  ];
}

/** JSON-LD siap disisipkan: @graph tunggal, dan "<" di-escape supaya tidak menutup tag script. */
export const serializeGraph = (nodes: Node[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );

/** Template dan halaman siap pakai: kode sumber yang bisa disalin. */
export function sourceCode(options: {
  url: string;
  name: string;
  description: string;
  locale: Locale;
  repository: string;
  image?: string;
  published?: string;
}): Node {
  return {
    "@type": "SoftwareSourceCode",
    name: options.name,
    description: options.description,
    url: options.url,
    codeRepository: options.repository,
    inLanguage: options.locale,
    programmingLanguage: ["TypeScript", "PHP", "CSS"],
    license: "https://opensource.org/licenses/MIT",
    ...(options.image && { image: options.image }),
    ...(options.published && { datePublished: options.published }),
  };
}
