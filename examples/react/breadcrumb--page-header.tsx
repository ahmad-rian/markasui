import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { Button } from "../../components/button/Button";

const items = [
  { label: "Projects", href: "/projects" },
  { label: "Website redesign", href: "/projects/website" },
  { label: "Settings" },
];

export default function BreadcrumbPageHeaderExample() {
  return (
    <div className="grid gap-3">
      <Breadcrumb items={items} />
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-xl font-semibold text-ink">Settings</h1>
          <p className="text-sm text-muted">
            Manage access and notifications for this project.
          </p>
        </div>
        <Button size="sm">Save</Button>
      </div>
    </div>
  );
}
