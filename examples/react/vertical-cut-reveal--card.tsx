import { VerticalCutReveal } from "../../components/vertical-cut-reveal/VerticalCutReveal";

export default function VerticalCutRevealCardExample() {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <h3 className="text-xl font-semibold text-ink">
        <VerticalCutReveal text="Team plan" />
      </h3>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-ink">
        <VerticalCutReveal
          text="Rp 149.000"
          split="chars"
          from="random"
          stagger={30}
          delay={200}
        />
      </p>
      <p className="mt-1 text-sm text-muted">
        <VerticalCutReveal
          text="per member each month, billed yearly"
          stagger={30}
          delay={500}
        />
      </p>
    </div>
  );
}
