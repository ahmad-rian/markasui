import { Button } from "../../components/button/Button";
import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

/** Plays every toggle there and back without changing the page theme. */
const playAll = () => document.dispatchEvent(new Event("markas-theme-demo"));

export default function ThemeToggleExample() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid w-full grid-cols-6 gap-2">
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="rotate" variant="outline" size="lg" />
          <span className="text-xs text-muted">Rotate</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="morph" variant="outline" size="lg" />
          <span className="text-xs text-muted">Morph</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="flip" variant="outline" size="lg" />
          <span className="text-xs text-muted">Flip</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="slide" variant="outline" size="lg" />
          <span className="text-xs text-muted">Slide</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="eclipse" variant="outline" size="lg" />
          <span className="text-xs text-muted">Eclipse</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ThemeToggle animation="spring" variant="outline" size="lg" />
          <span className="text-xs text-muted">Spring</span>
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={playAll}>
        Play all
      </Button>
    </div>
  );
}
