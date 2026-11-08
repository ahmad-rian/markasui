import { Button } from "../../components/button/Button";
import { LampEffect } from "../../components/lamp-effect/LampEffect";

export default function LampEffectFixture() {
  return (
    <LampEffect className="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">
          Build in the light
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Plan, ship, and review every release from one bright, focused
          workspace.
        </p>
        <div className="flex gap-2">
          <Button>Start for free</Button>
          <Button variant="ghost">Book a demo</Button>
        </div>
      </div>
    </LampEffect>
  );
}
