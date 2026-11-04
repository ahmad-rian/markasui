import { Button } from "../../components/button/Button";
import { Tooltip } from "../../components/tooltip/Tooltip";

export default function TooltipFixture() {
  return (
    <div className="flex justify-center py-10">
      <Tooltip content="Salin tautan ke papan klip">
        <Button variant="secondary">Salin tautan</Button>
      </Tooltip>
    </div>
  );
}
