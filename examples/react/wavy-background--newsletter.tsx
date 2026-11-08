import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { WavyBackground } from "../../components/wavy-background/WavyBackground";

export default function WavyBackgroundNewsletterExample() {
  return (
    <WavyBackground
      variant="silk"
      waves={5}
      speed="slow"
      className="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <form className="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">
            Get the weekly changelog
          </h3>
          <p className="text-sm text-muted">
            One short email every Monday. Unsubscribe anytime.
          </p>
        </div>
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Button type="submit">Subscribe</Button>
      </form>
    </WavyBackground>
  );
}
