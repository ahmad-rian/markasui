import { Button } from "../../components/button/Button";
import { LampEffect } from "../../components/lamp-effect/LampEffect";

export default function LampEffectStageExample() {
  return (
    <LampEffect
      variant="stage"
      color="warning"
      className="dark rounded-xl bg-canvas px-6 pt-24 pb-12 text-ink"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-sm font-medium text-warning">Live keynote</p>
        <h3 className="text-3xl font-semibold tracking-tight text-ink">
          Launch Week 2026
        </h3>
        <p className="max-w-72 text-sm text-muted">
          Five days, five releases. Join us on stage every morning at 10:00.
        </p>
        <Button>Save my seat</Button>
      </div>
    </LampEffect>
  );
}
