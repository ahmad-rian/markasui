import { BackgroundBoxes } from "../../components/background-boxes/BackgroundBoxes";

export default function BackgroundBoxesFeaturesExample() {
  return (
    <BackgroundBoxes
      variant="flat"
      color="success"
      rows={8}
      cols={14}
      size={36}
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <div className="grid gap-4">
        <h3 className="text-2xl font-semibold text-ink">
          Everything in its place
        </h3>
        <ul className="grid grid-cols-2 gap-3">
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-sm font-semibold text-ink">Boards</p>
            <p className="text-xs text-muted">Plan work in columns.</p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-sm font-semibold text-ink">Docs</p>
            <p className="text-xs text-muted">Write specs next to tasks.</p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-sm font-semibold text-ink">Goals</p>
            <p className="text-xs text-muted">Track progress weekly.</p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-3">
            <p className="text-sm font-semibold text-ink">Reports</p>
            <p className="text-xs text-muted">Share wins with one link.</p>
          </li>
        </ul>
      </div>
    </BackgroundBoxes>
  );
}
