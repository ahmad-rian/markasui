import { BackgroundBoxes } from "../../components/background-boxes/BackgroundBoxes";
import { Button } from "../../components/button/Button";

export default function BackgroundBoxesFixture() {
  return (
    <BackgroundBoxes className="rounded-xl border border-line bg-surface px-6 py-16">
      <div className="grid justify-items-center gap-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-ink">
          Design in blocks
        </h2>
        <p className="max-w-72 rounded-md bg-surface/80 text-sm text-muted">
          Move your cursor across the grid and watch each tile light up.
        </p>
        <Button>Explore blocks</Button>
      </div>
    </BackgroundBoxes>
  );
}
