import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Products", href: "/products", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

/** From 42rem the bar becomes three columns: links left, logo centre, actions right. */
const centered =
  "@2xl:[&>div:first-child]:grid @2xl:[&>div:first-child]:grid-cols-[1fr_auto_1fr] @2xl:[&>div>nav]:order-first";

export default function NavbarCenteredLogoExample() {
  return (
    <Navbar
      links={links}
      className={centered}
      brand={
        <>
          <svg
            className="size-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 3-9 5 9 5 9-5-9-5z" />
            <path d="m3 13 9 5 9-5" />
          </svg>
          <span>Acme</span>
        </>
      }
      actions={
        <>
          <a
            href="/blog"
            className="hidden rounded-md px-3 text-sm font-medium text-muted hover:text-ink @2xl:inline"
          >
            Blog
          </a>
          <a
            href="/login"
            className="hidden rounded-md px-3 text-sm font-medium text-muted hover:text-ink @2xl:inline"
          >
            Sign in
          </a>
          <Button size="sm">Get started</Button>
        </>
      }
    />
  );
}
