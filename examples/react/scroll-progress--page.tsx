import { ScrollProgress } from "../../components/scroll-progress/ScrollProgress";

export default function ScrollProgressPageExample() {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <ScrollProgress />
      <p className="text-sm text-muted">5 min read</p>
      <h3 className="mt-1 text-lg font-semibold text-ink">
        Designing tokens that survive dark mode
      </h3>
      <p className="mt-2 text-sm text-muted">
        Without a target, the bar is fixed to the top of the window and fills as
        the reader scrolls through the whole page.
      </p>
    </article>
  );
}
