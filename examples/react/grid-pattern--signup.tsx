import { Button } from "../../components/button/Button";
import { GridPattern } from "../../components/grid-pattern/GridPattern";
import { Input } from "../../components/input/Input";

export default function GridPatternSignupExample() {
  return (
    <GridPattern
      cellSize={24}
      mask="linear"
      cells={[
        [13, 0],
        [16, 1],
        [18, 0],
      ]}
      className="rounded-xl border border-line bg-surface p-6"
    >
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <h3 className="text-lg font-semibold text-ink">Get the changelog</h3>
          <p className="text-sm text-muted">
            One short email when we ship something new. No spam.
          </p>
        </div>
        <div className="flex items-end gap-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </div>
      </form>
    </GridPattern>
  );
}
