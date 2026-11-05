import { Button } from "../../components/button/Button";
import { Popover } from "../../components/popover/Popover";

export default function PopoverTopExample() {
  return (
    <div className="flex justify-center pt-40">
      <Popover label="Set status" side="top" align="center">
        <div className="grid gap-2">
          <p className="font-medium text-ink">Your status</p>
          <p className="text-muted">
            Teammates see your status next to your name.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">
              Busy
            </Button>
            <Button size="sm" variant="secondary">
              Away
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
