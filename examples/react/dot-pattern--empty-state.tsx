import { Button } from "../../components/button/Button";
import { DotPattern } from "../../components/dot-pattern/DotPattern";

export default function DotPatternEmptyStateExample() {
  return (
    <DotPattern
      mask="radial"
      spacing={12}
      className="rounded-xl border border-dashed border-line bg-canvas px-6 py-10"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-line bg-surface text-muted">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M12 11v5m-2.5-2.5h5" />
          </svg>
        </span>
        <div className="grid gap-1">
          <h3 className="text-base font-semibold text-ink">No projects yet</h3>
          <p className="text-sm text-muted">
            Create your first project to start tracking work.
          </p>
        </div>
        <Button size="sm">New project</Button>
      </div>
    </DotPattern>
  );
}
