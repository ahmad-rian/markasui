import { Button } from "../../components/button/Button";
import { HoldButton } from "../../components/hold-button/HoldButton";

export default function HoldButtonConfirmExample() {
  return (
    <div className="grid gap-4 rounded-xl border border-line bg-surface p-6">
      <div className="grid gap-1">
        <p className="text-base font-semibold text-ink">Delete workspace</p>
        <p className="text-sm text-muted">
          This removes 12 projects and 48 members. It cannot be undone.
        </p>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <HoldButton variant="danger" duration={2000}>
          Hold to delete
        </HoldButton>
      </div>
    </div>
  );
}
