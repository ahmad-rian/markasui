import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Profile", href: "#profile" },
  { label: "Billing", href: "#billing" },
  { label: "Settings", href: "#settings" },
  { separator: true as const },
  { label: "Sign out", value: "sign-out" },
];

export default function DropdownMenuLinksExample() {
  return (
    <div className="flex justify-center">
      <DropdownMenu label="Account" items={items} />
    </div>
  );
}
