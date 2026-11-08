import { Button } from "../../components/button/Button";
import { LampEffect } from "../../components/lamp-effect/LampEffect";

export default function LampEffectNotFoundExample() {
  return (
    <LampEffect
      variant="halo"
      size="sm"
      className="dark rounded-xl bg-canvas px-6 pt-28 pb-12 text-ink"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">
          This page wandered off
        </h3>
        <p className="max-w-72 text-sm text-muted">
          The link may be old, or the page has moved somewhere new.
        </p>
        <div className="flex gap-2">
          <Button>Back to home</Button>
          <Button variant="ghost">Contact support</Button>
        </div>
      </div>
    </LampEffect>
  );
}
