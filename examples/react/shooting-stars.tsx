import { Button } from "../../components/button/Button";
import { ShootingStars } from "../../components/shooting-stars/ShootingStars";

export default function ShootingStarsFixture() {
  return (
    <ShootingStars className="rounded-xl border border-line bg-surface px-6 py-14">
      <div className="grid justify-items-center gap-4 text-center">
        <p className="text-sm font-medium text-muted">Private beta</p>
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Make a wish, then ship it
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Turn a one line idea into a working preview before your coffee gets
          cold.
        </p>
        <Button>Join the waitlist</Button>
      </div>
    </ShootingStars>
  );
}
