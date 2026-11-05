import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  {
    label: "Product",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage in real time",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, SSO, and audit logs",
      },
    ],
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export default function NavbarBlurExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-canvas">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-linear-to-br from-primary via-primary-soft to-canvas"
        />
        <Navbar
          links={links}
          variant="blur"
          sticky
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
            <Button size="sm" variant="secondary">
              Sign in
            </Button>
          }
        />
        <div className="relative grid gap-1 px-4 pt-6 pb-8">
          <h2 className="text-lg font-semibold text-ink">
            Ship faster with Acme
          </h2>
          <p className="text-sm text-muted">
            The header stays readable while the page scrolls under it.
          </p>
        </div>
      </div>
    </div>
  );
}
