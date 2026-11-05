import { Button } from "../../components/button/Button";
import { Command } from "../../components/command/Command";

const items = [
  {
    group: "Documentation",
    label: "Getting started",
    href: "#getting-started",
  },
  { group: "Documentation", label: "Installation", href: "#installation" },
  { group: "Documentation", label: "Theming", href: "#theming" },
  { group: "Components", label: "Button", href: "#button" },
  { group: "Components", label: "Modal", href: "#modal" },
];

export default function CommandLinksExample() {
  return (
    <Command
      items={items}
      trigger={<Button variant="ghost">Search documentation</Button>}
    />
  );
}
