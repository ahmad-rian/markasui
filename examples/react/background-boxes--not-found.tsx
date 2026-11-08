import { BackgroundBoxes } from "../../components/background-boxes/BackgroundBoxes";
import { Button } from "../../components/button/Button";

export default function BackgroundBoxesNotFoundExample() {
  return (
    <BackgroundBoxes
      variant="perspective"
      color="warning"
      rows={14}
      cols={20}
      className="rounded-xl border border-line bg-surface px-6 pt-10 pb-24"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">This tile is missing</h3>
        <p className="max-w-72 text-sm text-muted">
          The page may have moved. Try the dashboard instead.
        </p>
        <Button variant="secondary">Go to dashboard</Button>
      </div>
    </BackgroundBoxes>
  );
}
