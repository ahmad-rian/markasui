import { Separator } from "../../components/separator/Separator";

export default function SeparatorFixture() {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-ink">
      <p className="text-sm font-medium">MarkasUI</p>
      <p className="text-sm text-muted">
        Components for Blade, React, and Vue.
      </p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  );
}
