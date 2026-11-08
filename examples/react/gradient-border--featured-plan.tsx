import { Button } from "../../components/button/Button";
import { GradientBorder } from "../../components/gradient-border/GradientBorder";

export default function GradientBorderFeaturedPlanExample() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="grid gap-2 rounded-xl border border-line bg-surface p-5">
        <h3 className="text-base font-semibold text-ink">Starter</h3>
        <p className="text-2xl font-bold text-ink">$0</p>
        <p className="text-sm text-muted">For side projects.</p>
        <Button variant="secondary">Choose</Button>
      </div>
      <GradientBorder variant="pulse" glow>
        <div className="grid gap-2 p-5">
          <h3 className="text-base font-semibold text-ink">Team</h3>
          <p className="text-2xl font-bold text-ink">$49</p>
          <p className="text-sm text-muted">Most popular.</p>
          <Button>Choose</Button>
        </div>
      </GradientBorder>
    </div>
  );
}
