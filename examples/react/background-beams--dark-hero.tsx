import { BackgroundBeams } from "../../components/background-beams/BackgroundBeams";
import { Button } from "../../components/button/Button";

export default function BackgroundBeamsDarkHeroExample() {
  return (
    <BackgroundBeams
      color="success"
      count={12}
      speed="slow"
      className="dark rounded-xl bg-canvas px-6 py-14 text-ink"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <h3 className="text-3xl font-bold tracking-tight text-ink">
          Every signal, one view
        </h3>
        <p className="max-w-72 text-sm text-muted">
          Logs, traces, and alerts flow into a single timeline your team can
          trust.
        </p>
        <div className="flex gap-2">
          <Button>Start monitoring</Button>
          <Button variant="secondary">View demo</Button>
        </div>
      </div>
    </BackgroundBeams>
  );
}
