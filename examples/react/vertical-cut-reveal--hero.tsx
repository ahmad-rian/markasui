import { VerticalCutReveal } from "../../components/vertical-cut-reveal/VerticalCutReveal";

export default function VerticalCutRevealHeroExample() {
  return (
    <div className="py-4 text-center">
      <h2 className="text-4xl leading-tight font-semibold tracking-tight text-ink">
        <VerticalCutReveal
          text={"Design once.\nShip to Blade,\nReact, and Vue."}
          split="lines"
          stagger={120}
        />
      </h2>
      <a
        href="#"
        className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Browse components
      </a>
    </div>
  );
}
