import { BackgroundLines } from "../../components/background-lines/BackgroundLines";
import { Button } from "../../components/button/Button";

export default function BackgroundLinesNotFoundExample() {
  return (
    <BackgroundLines
      variant="rays"
      color="warning"
      count={16}
      className="rounded-xl border border-line bg-canvas px-6 pt-20 pb-12"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">
          Nothing under this spotlight
        </h3>
        <p className="max-w-72 text-sm text-muted">
          The page you are looking for was moved or never existed.
        </p>
        <Button variant="secondary">Back to home</Button>
      </div>
    </BackgroundLines>
  );
}
