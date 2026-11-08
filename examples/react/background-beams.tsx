import { BackgroundBeams } from "../../components/background-beams/BackgroundBeams";
import { Button } from "../../components/button/Button";

export default function BackgroundBeamsFixture() {
  return (
    <BackgroundBeams className="rounded-xl border border-line bg-surface px-6 py-16">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-ink">
          Light up your launch
        </h2>
        <p className="max-w-72 text-sm text-muted">
          Release notes, waitlists, and changelogs that people actually read.
        </p>
        <Button>Join the waitlist</Button>
      </div>
    </BackgroundBeams>
  );
}
