import { Footer } from "../../components/footer/Footer";

const columns = [
  {
    links: [
      {
        label: "Features",
        href: "/features",
      },
      {
        label: "Pricing",
        href: "/pricing",
      },
      {
        label: "Customers",
        href: "/customers",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Help",
        href: "/help",
      },
    ],
  },
];

const socials = [
  {
    label: "X",
    href: "https://x.com/rapi",
    icon: "M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rapi",
    icon: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/rapi",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z",
  },
];

export default function FooterCenteredExample() {
  return (
    <Footer
      variant="centered"
      description="Tidy books for growing teams."
      copyright="© 2026 PT Rapi Teknologi Indonesia"
      columns={columns}
      socials={socials}
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
            <path d="M6 20V4h7a5 5 0 0 1 0 10H6m7 0 5 6" />
          </svg>
          Rapi
        </>
      }
    />
  );
}
