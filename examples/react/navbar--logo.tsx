import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Product", href: "/product", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function NavbarLogoExample() {
  return (
    <Navbar
      links={links}
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
    />
  );
}
