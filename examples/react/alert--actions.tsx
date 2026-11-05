import { Alert } from "../../components/alert/Alert";
import { Button } from "../../components/button/Button";

export default function AlertActionsExample() {
  return (
    <div className="grid gap-3">
      <Alert variant="warning" title="Your trial ends in 3 days">
        <p>Upgrade now to keep access to all of your projects.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm">Upgrade plan</Button>
          <Button size="sm" variant="ghost">
            Remind me later
          </Button>
        </div>
      </Alert>
      <Alert variant="danger" title="Sync failed">
        <p>We could not reach the server. Your last 2 edits are not saved.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary">
            Try again
          </Button>
        </div>
      </Alert>
    </div>
  );
}
