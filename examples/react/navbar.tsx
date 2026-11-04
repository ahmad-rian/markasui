import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
];

export default function NavbarFixture() {
  return (
    <Navbar
      links={links}
      brand="MarkasUI"
      actions={<Button size="sm">Sign in</Button>}
    />
  );
}
