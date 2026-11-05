import { Button } from "../../components/button/Button";
import { RippleBackground } from "../../components/ripple-background/RippleBackground";

export default function RippleBackgroundCallExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-canvas">
      <RippleBackground
        color="primary"
        rings={5}
        size={104}
        gap={56}
        className="grid h-56 place-items-center"
      >
        <span className="grid size-20 place-items-center rounded-full border border-line bg-surface text-xl font-semibold text-ink">
          MC
        </span>
      </RippleBackground>
      <div className="grid justify-items-center gap-4 px-6 pb-8 text-center">
        <div className="grid gap-1">
          <h3 className="text-base font-semibold text-ink">
            Calling Maya Chen
          </h3>
          <p className="text-sm text-muted">Ringing on desktop and mobile</p>
        </div>
        <Button variant="danger">End call</Button>
      </div>
    </div>
  );
}
