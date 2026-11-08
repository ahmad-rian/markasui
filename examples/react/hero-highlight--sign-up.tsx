import { Button } from "../../components/button/Button";
import { HeroHighlight } from "../../components/hero-highlight/HeroHighlight";
import { Input } from "../../components/input/Input";

export default function HeroHighlightSignUpExample() {
  return (
    <HeroHighlight
      color="warning"
      spacing={20}
      radius={200}
      className="dark rounded-xl bg-canvas px-6 py-10 text-ink"
    >
      <form className="mx-auto grid max-w-80 gap-4">
        <h3 className="text-2xl leading-snug font-semibold text-ink">
          Join <mark>4,000 makers</mark> shipping every week
        </h3>
        <Input label="Work email" type="email" placeholder="you@studio.com" />
        <Button type="submit">Create account</Button>
      </form>
    </HeroHighlight>
  );
}
