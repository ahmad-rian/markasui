import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];

export default function BreadcrumbFixture() {
  return <Breadcrumb items={items} />;
}
