import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Beranda", href: "/", active: true },
  { label: "Komponen", href: "/komponen" },
  { label: "Dokumentasi", href: "/dokumentasi" },
];

export default function NavbarFixture() {
  return (
    <Navbar
      links={links}
      brand="MarkasUI"
      actions={<Button size="sm">Masuk</Button>}
    />
  );
}
