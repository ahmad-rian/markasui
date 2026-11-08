import { BackgroundBeams } from "../../components/background-beams/BackgroundBeams";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

export default function BackgroundBeamsNewsletterExample() {
  return (
    <BackgroundBeams
      variant="pulse"
      count={10}
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <form className="grid gap-4">
        <div className="grid gap-1">
          <h3 className="text-xl font-semibold text-ink">The Friday digest</h3>
          <p className="text-sm text-muted">
            One email a week with the best product updates. No spam.
          </p>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input label="Email" type="email" placeholder="you@company.com" />
          </div>
          <Button type="submit">Subscribe</Button>
        </div>
      </form>
    </BackgroundBeams>
  );
}
