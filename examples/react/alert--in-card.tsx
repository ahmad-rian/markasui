import { Alert } from "../../components/alert/Alert";
import { Button } from "../../components/button/Button";

export default function AlertInCardExample() {
  return (
    <div className="grid gap-4 rounded-lg border border-line bg-surface p-5">
      <div className="grid gap-1">
        <h3 className="text-base font-semibold text-ink">Delete workspace</h3>
        <p className="text-sm text-muted">
          All projects, files, and members will be removed.
        </p>
      </div>
      <Alert variant="danger" title="This cannot be undone">
        Export your data first if you want to keep a copy.
      </Alert>
      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete workspace</Button>
      </div>
    </div>
  );
}
