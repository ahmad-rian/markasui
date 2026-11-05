import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Popover } from "../../components/popover/Popover";

export default function PopoverFormExample() {
  return (
    <div className="flex justify-center">
      <Popover label="Dimensions" align="center">
        <form className="grid gap-3">
          <p className="font-medium text-ink">Image size</p>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="width"
              label="Width"
              placeholder="1200"
              inputMode="numeric"
            />
            <Input
              name="height"
              label="Height"
              placeholder="630"
              inputMode="numeric"
            />
          </div>
          <Button type="submit" size="sm">
            Apply
          </Button>
        </form>
      </Popover>
    </div>
  );
}
