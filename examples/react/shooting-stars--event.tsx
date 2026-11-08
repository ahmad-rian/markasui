import { Button } from "../../components/button/Button";
import { ShootingStars } from "../../components/shooting-stars/ShootingStars";

export default function ShootingStarsEventExample() {
  return (
    <ShootingStars
      variant="dawn"
      frequency="high"
      trailColor="danger"
      stars={40}
      seed={17}
      className="dark rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <div className="grid gap-4">
        <p className="text-sm font-medium text-muted">
          Live, 14 November, 06:00 UTC
        </p>
        <h3 className="text-2xl font-semibold text-balance text-ink">
          Sunrise Summit: watch the keynote as it lands
        </h3>
        <p className="max-w-80 text-sm text-muted">
          Four talks, one hour, and a few surprises we have kept quiet all year.
        </p>
        <div className="flex gap-2">
          <Button>Save my spot</Button>
          <Button variant="ghost">Add to calendar</Button>
        </div>
      </div>
    </ShootingStars>
  );
}
