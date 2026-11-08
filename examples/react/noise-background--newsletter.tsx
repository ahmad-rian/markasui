import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { NoiseBackground } from "../../components/noise-background/NoiseBackground";

export default function NoiseBackgroundNewsletterExample() {
  return (
    <NoiseBackground
      variant="paper"
      color="muted"
      size="coarse"
      speed="slow"
      className="rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form className="grid gap-4">
        <div className="grid gap-1">
          <h3 className="text-xl font-semibold text-ink">The Sunday Letter</h3>
          <p className="text-sm text-muted">
            One long read, three links, and no noise. Every Sunday morning.
          </p>
        </div>
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Button type="submit">Subscribe</Button>
      </form>
    </NoiseBackground>
  );
}
