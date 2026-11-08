import { HeroHighlight } from "../../components/hero-highlight/HeroHighlight";

export default function HeroHighlightQuoteExample() {
  return (
    <HeroHighlight
      speed="slow"
      spacing={12}
      className="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <figure className="grid gap-4">
        <blockquote className="text-lg leading-relaxed text-ink">
          We rebuilt our dashboard with MarkasUI in a weekend. Blade and React
          screens finally match, and <mark>nobody wants to go back</mark>.
        </blockquote>
        <figcaption className="text-sm text-muted">
          Dana Reyes, Frontend Lead in Jakarta
        </figcaption>
      </figure>
    </HeroHighlight>
  );
}
