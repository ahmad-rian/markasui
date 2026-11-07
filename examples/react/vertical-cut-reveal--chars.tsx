import { VerticalCutReveal } from "../../components/vertical-cut-reveal/VerticalCutReveal";

export default function VerticalCutRevealCharsExample() {
  return (
    <div className="text-center">
      <p className="text-5xl font-bold tracking-tight text-ink">
        <VerticalCutReveal
          text="Jakarta Design Week"
          split="chars"
          direction="down"
          from="center"
          stagger={25}
        />
      </p>
      <p className="mt-3 text-sm text-muted">
        12 to 14 March 2027, Taman Ismail Marzuki
      </p>
    </div>
  );
}
