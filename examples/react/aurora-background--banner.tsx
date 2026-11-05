import { AuroraBackground } from "../../components/aurora-background/AuroraBackground";
import { Button } from "../../components/button/Button";

export default function AuroraBackgroundBannerExample() {
  return (
    <AuroraBackground
      speed="fast"
      className="rounded-lg border border-line bg-surface px-4 py-3"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink">
          <span className="font-semibold">New:</span> AI summaries for every
          meeting
        </p>
        <Button size="sm" variant="secondary">
          Learn more
        </Button>
      </div>
    </AuroraBackground>
  );
}
