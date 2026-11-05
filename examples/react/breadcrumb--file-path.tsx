import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";

const items = [
  { label: "markasui", href: "/" },
  { label: "components", href: "/components" },
  { label: "tabs", href: "/components/tabs" },
  { label: "Tabs.tsx" },
];

export default function BreadcrumbFilePathExample() {
  return (
    <div className="rounded-lg border border-line bg-subtle px-3 py-2">
      <Breadcrumb navLabel="File path" items={items} />
    </div>
  );
}
