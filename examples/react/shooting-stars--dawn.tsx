import { Button } from "../../components/button/Button";
import { ShootingStars } from "../../components/shooting-stars/ShootingStars";

export default function ShootingStarsDawnExample() {
  return (
    <ShootingStars
      variant="dawn"
      stars={50}
      seed={4}
      className="rounded-xl border border-line bg-surface px-6 pt-10 pb-14"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <h3 className="text-xl font-semibold text-balance text-ink">
          Early access opens at sunrise
        </h3>
        <p className="max-w-72 text-sm text-muted">
          We invite a new group every morning. Leave your email and we will save
          you a seat.
        </p>
        <Button>Notify me</Button>
      </div>
    </ShootingStars>
  );
}
