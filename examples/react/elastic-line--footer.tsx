import { ElasticLine } from "../../components/elastic-line/ElasticLine";

const footer = "grid gap-1";
const row = "flex items-center justify-between gap-4 text-sm text-muted";
const links = "flex gap-4";
const link =
  "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pages = [
  { label: "Docs", href: "/docs" },
  { label: "Templates", href: "/templates" },
  { label: "GitHub", href: "https://github.com" },
];

export default function ElasticLineFooterExample() {
  return (
    <footer className={footer}>
      <ElasticLine color="muted" strokeWidth={1} reach={20} />
      <div className={row}>
        <p>2026 Markas Studio, Bandung</p>
        <nav aria-label="Footer">
          <ul className={links}>
            {pages.map((page) => (
              <li key={page.label}>
                <a href={page.href} className={link}>
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
