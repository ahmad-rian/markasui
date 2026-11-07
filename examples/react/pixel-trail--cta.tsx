import { Button } from "../../components/button/Button";
import { PixelTrail } from "../../components/pixel-trail/PixelTrail";

const card = "grid gap-4 rounded-xl border border-line bg-subtle p-6";
const title = "text-xl font-semibold text-ink";
const text = "mt-1 text-sm text-muted";
const actions = "flex flex-wrap gap-3";

export default function PixelTrailCtaExample() {
  return (
    <PixelTrail
      variant="dot"
      color="success"
      cellSize={16}
      fade={900}
      className={card}
    >
      <div>
        <h3 className={title}>Join 4,000 teams across Indonesia</h3>
        <p className={text}>Free for 14 days, then from Rp 49.000 a month.</p>
      </div>
      <div className={actions}>
        <Button>Start free trial</Button>
        <Button variant="secondary">Talk to sales</Button>
      </div>
    </PixelTrail>
  );
}
