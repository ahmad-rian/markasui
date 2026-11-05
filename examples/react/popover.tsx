import { Button } from "../../components/button/Button";
import { Popover } from "../../components/popover/Popover";

export default function PopoverFixture() {
  return (
    <Popover label="Share">
      <div className="grid gap-3">
        <div className="grid gap-1">
          <p className="font-medium text-ink">Share project</p>
          <p className="text-muted">
            Anyone with the link can view this project.
          </p>
        </div>
        <Button size="sm">Copy link</Button>
      </div>
    </Popover>
  );
}
