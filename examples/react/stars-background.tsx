import { Button } from "../../components/button/Button";
import { StarsBackground } from "../../components/stars-background/StarsBackground";

export default function StarsBackgroundFixture() {
  return (
    <StarsBackground
      count={120}
      className="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <p className="text-sm font-medium text-muted">Launch week, day 3</p>
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Deploys that ship while you sleep
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Schedule releases for any time zone and wake up to a green dashboard.
        </p>
        <Button>Read the announcement</Button>
      </div>
    </StarsBackground>
  );
}
