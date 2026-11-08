import { Button } from "../../components/button/Button";
import { NoiseBackground } from "../../components/noise-background/NoiseBackground";

export default function NoiseBackgroundFilmExample() {
  return (
    <NoiseBackground
      variant="film"
      color="danger"
      intensity="high"
      className="dark rounded-xl bg-canvas px-6 py-14 text-ink"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-sm font-medium text-danger">Premieres Friday</p>
        <h3 className="text-3xl font-semibold tracking-tight text-ink">
          The Last Release
        </h3>
        <p className="max-w-72 text-sm text-muted">
          A documentary about the team that shipped on time, every time.
        </p>
        <Button>Watch the trailer</Button>
      </div>
    </NoiseBackground>
  );
}
