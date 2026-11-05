import { localePath, t, type Locale } from "./i18n";

export const SITE = {
  name: "MarkasUI",
  version: "0.1",
  repo: "https://github.com/ahmad-rian/markasui",
} as const;

export const DOC_SLUGS = [
  "introduction",
  "installation",
  "theming",
  "cli",
  "mcp",
  "skills",
  "changelog",
] as const;
export type DocSlug = (typeof DOC_SLUGS)[number];

export const nav = (locale: Locale) => {
  const strings = t(locale).nav;
  return [
    { key: "home", href: localePath(locale, "/"), label: strings.home },
    {
      key: "docs",
      href: localePath(locale, "/docs/introduction"),
      label: strings.docs,
    },
    {
      key: "components",
      href: localePath(locale, "/components"),
      label: strings.components,
    },
    {
      key: "templates",
      href: localePath(locale, "/templates"),
      label: strings.templates,
    },
    { key: "mcp", href: localePath(locale, "/docs/mcp"), label: strings.mcp },
  ] as const;
};

export const docsNav = (locale: Locale) =>
  DOC_SLUGS.map((slug) => ({
    slug,
    href: localePath(locale, `/docs/${slug}`),
    label: t(locale).docsNav[slug],
  }));

/** Jumlah star diambil saat build. Gagal ambil berarti badge disembunyikan. */
export async function getGithubStars(): Promise<number | null> {
  const repoPath = new URL(SITE.repo).pathname.slice(1);
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}
