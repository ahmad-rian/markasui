import { Button } from "../../components/button/Button";
import { PixelTrail } from "../../components/pixel-trail/PixelTrail";

const hero =
  "grid h-72 content-center justify-items-center gap-3 rounded-xl border border-line bg-surface p-6 text-center";
const title = "max-w-72 text-2xl font-semibold text-ink";
const text = "text-sm text-muted";

export default function PixelTrailExample() {
  return (
    <PixelTrail showGrid className={hero}>
      <h3 className={title}>Interfaces that answer the pointer</h3>
      <p className={text}>Move across the grid and leave a trail.</p>
      <Button>Get started</Button>
    </PixelTrail>
  );
}
