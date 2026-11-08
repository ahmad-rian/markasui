import { Button } from "../../components/button/Button";
import { SpotlightBeam } from "../../components/spotlight-beam/SpotlightBeam";

export default function SpotlightBeamCtaExample() {
  return (
    <SpotlightBeam
      follow
      color="warning"
      intensity="strong"
      speed="slow"
      className="dark rounded-xl bg-surface px-6 py-10 text-ink"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-2">
          <h3 className="text-xl font-semibold text-ink">
            Ready to go live tonight?
          </h3>
          <p className="text-sm text-muted">
            Deploy in one click. Roll back just as fast.
          </p>
        </div>
        <Button>Deploy now</Button>
      </div>
    </SpotlightBeam>
  );
}
