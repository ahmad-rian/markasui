import { PixelTrail } from "../../components/pixel-trail/PixelTrail";

const pad =
  "grid h-64 content-end rounded-xl border border-dashed border-line bg-canvas p-4";
const title = "text-sm font-semibold text-ink";
const text = "text-sm text-muted";

export default function PixelTrailSketchExample() {
  return (
    <PixelTrail
      variant="brush"
      color="warning"
      cellSize={12}
      fade={1500}
      autoplay
      className={pad}
    >
      <p className={title}>Sketch pad</p>
      <p className={text}>Draw with your cursor. It doodles on its own too.</p>
    </PixelTrail>
  );
}
