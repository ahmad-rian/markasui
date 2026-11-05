import { AlertDialog } from "../../components/alert-dialog/AlertDialog";
import { Button } from "../../components/button/Button";

export default function AlertDialogDangerExample() {
  return (
    <div className="flex justify-center">
      <AlertDialog
        title="Delete your account?"
        variant="danger"
        actionLabel="Delete account"
        trigger={<Button variant="danger">Delete account</Button>}
      >
        All of your projects, invoices, and team members will be removed. You
        cannot undo this action.
      </AlertDialog>
    </div>
  );
}
