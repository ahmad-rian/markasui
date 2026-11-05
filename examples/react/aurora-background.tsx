import { Button } from "../../components/button/Button";
import { AuroraBackground } from "../../components/aurora-background/AuroraBackground";

export default function AuroraBackgroundFixture() {
  return (
    <AuroraBackground className="rounded-xl border border-line bg-surface px-6 py-14">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Meet your calmer workspace
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Notes, tasks, and docs in one quiet place, synced across every device.
        </p>
        <div className="flex gap-2">
          <Button>Try it free</Button>
          <Button variant="ghost">See how it works</Button>
        </div>
      </div>
    </AuroraBackground>
  );
}
