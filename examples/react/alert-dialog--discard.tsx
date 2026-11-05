import { AlertDialog } from "../../components/alert-dialog/AlertDialog";
import { Button } from "../../components/button/Button";

export default function AlertDialogDiscardExample() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4">
      <div className="grid gap-1">
        <p className="text-sm font-medium text-ink">Draft: Q3 product update</p>
        <p className="text-sm text-muted">3 unsaved changes</p>
      </div>
      <AlertDialog
        title="Discard unsaved changes?"
        variant="danger"
        cancelLabel="Keep editing"
        actionLabel="Discard"
        trigger={<Button variant="secondary">Close editor</Button>}
      >
        Your edits since the last save will be lost.
      </AlertDialog>
    </div>
  );
}
