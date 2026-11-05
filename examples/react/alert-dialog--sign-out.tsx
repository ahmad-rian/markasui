import { AlertDialog } from "../../components/alert-dialog/AlertDialog";
import { Button } from "../../components/button/Button";

export default function AlertDialogSignOutExample() {
  return (
    <div className="flex justify-center">
      <AlertDialog
        title="Sign out of all devices?"
        actionLabel="Sign out"
        trigger={
          <Button variant="ghost">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" />
            </svg>
            Sign out everywhere
          </Button>
        }
      >
        You will need to sign in again on your phone, tablet, and other
        browsers.
      </AlertDialog>
    </div>
  );
}
