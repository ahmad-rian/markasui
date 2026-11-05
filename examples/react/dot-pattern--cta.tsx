import { Button } from "../../components/button/Button";
import { DotPattern } from "../../components/dot-pattern/DotPattern";

export default function DotPatternCtaExample() {
  return (
    <DotPattern
      color="primary"
      mask="linear"
      spacing={20}
      className="rounded-xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <h3 className="text-lg font-semibold text-ink">
            Ready to launch your next project?
          </h3>
          <p className="text-sm text-muted">
            Start with a free workspace. Upgrade when your team grows.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Create workspace</Button>
          <Button variant="ghost">Talk to sales</Button>
        </div>
      </div>
    </DotPattern>
  );
}
