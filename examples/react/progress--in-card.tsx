import { Button } from "../../components/button/Button";
import { Progress } from "../../components/progress/Progress";

export default function ProgressInCardExample() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-0.5 text-sm">
            <span className="font-medium text-ink">quarterly-report.pdf</span>
            <span className="text-muted">2.4 MB of 4 MB</span>
          </div>
          <Button size="sm" variant="ghost">
            Cancel
          </Button>
        </div>
        <Progress value={60} aria-label="Uploading quarterly-report.pdf" />
      </div>
      <div className="grid gap-3 rounded-lg border border-line bg-surface p-4">
        <div className="grid gap-0.5 text-sm">
          <span className="font-medium text-ink">Preparing export</span>
          <span className="text-muted">This can take a few minutes.</span>
        </div>
        <Progress aria-label="Preparing export" />
      </div>
    </div>
  );
}
