import { Collapsible } from "../../components/collapsible/Collapsible";

export default function CollapsibleShowMoreExample() {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium text-ink">Team members</p>
      <ul className="grid gap-1 text-sm text-muted">
        <li>Rina Kusuma</li>
        <li>Budi Santoso</li>
        <li>Dewi Lestari</li>
      </ul>
      <Collapsible title="Show 3 more">
        <ul className="grid gap-1">
          <li>Agus Pratama</li>
          <li>Sari Wulandari</li>
          <li>Yusuf Hidayat</li>
        </ul>
      </Collapsible>
    </div>
  );
}
