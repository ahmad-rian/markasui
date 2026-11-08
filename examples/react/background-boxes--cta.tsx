import { BackgroundBoxes } from "../../components/background-boxes/BackgroundBoxes";
import { Button } from "../../components/button/Button";

export default function BackgroundBoxesCtaExample() {
  return (
    <BackgroundBoxes
      color="danger"
      rows={10}
      cols={16}
      size={28}
      speed="fast"
      className="rounded-xl border border-line bg-surface p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">Black Friday deal</h3>
          <p className="text-sm text-muted">Half off every annual plan.</p>
        </div>
        <Button>Claim offer</Button>
      </div>
    </BackgroundBoxes>
  );
}
