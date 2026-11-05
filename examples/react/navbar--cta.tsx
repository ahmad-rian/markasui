import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export default function NavbarCtaExample() {
  return (
    <Navbar
      links={links}
      brand="Acme"
      actions={
        <>
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">Get started</Button>
        </>
      }
    />
  );
}
