import { Button } from "../../components/button/Button";
import { Tooltip } from "../../components/tooltip/Tooltip";

export default function TooltipFixture() {
  return (
    <div className="flex justify-center py-10">
      <Tooltip content="Copy link to clipboard">
        <Button variant="secondary">Copy link</Button>
      </Tooltip>
    </div>
  );
}
