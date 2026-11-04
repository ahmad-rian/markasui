import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";

const items = [
  { label: "Beranda", href: "/" },
  { label: "Komponen", href: "/komponen" },
  { label: "Breadcrumb" },
];

export default function BreadcrumbFixture() {
  return <Breadcrumb items={items} />;
}
