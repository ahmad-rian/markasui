export const SITE = {
  name: "MarkasUI",
  description: "Markas komponen UI ringan untuk Blade, React, dan Vue.",
  repo: "https://github.com/ahmad-rian/markasui",
  author: "CV Jenderal Solusi Digital",
  city: "Purwokerto",
} as const;

export const NAV = [
  { href: "/docs/introduction", label: "Docs" },
  { href: "/components", label: "Komponen" },
  { href: "/docs/mcp", label: "MCP" },
] as const;

export const DOCS_NAV = [
  { href: "/docs/introduction", label: "Pengenalan" },
  { href: "/docs/installation", label: "Instalasi" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/cli", label: "CLI" },
  { href: "/docs/mcp", label: "MCP" },
  { href: "/docs/skills", label: "Agent Skill" },
  { href: "/docs/changelog", label: "Changelog" },
] as const;

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
