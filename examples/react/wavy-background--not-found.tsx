import { Button } from "../../components/button/Button";
import { WavyBackground } from "../../components/wavy-background/WavyBackground";

export default function WavyBackgroundNotFoundExample() {
  return (
    <WavyBackground
      color="muted"
      waves={5}
      speed="slow"
      className="rounded-xl border border-line bg-surface px-6 pt-10 pb-28"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">
          This page washed out to sea
        </h3>
        <p className="max-w-72 text-sm text-muted">
          The link may be broken, or the page was moved.
        </p>
        <Button variant="secondary">Back to home</Button>
      </div>
    </WavyBackground>
  );
}
