import { TextHighlighter } from "../../components/text-highlighter/TextHighlighter";

export default function TextHighlighterMarkerExample() {
  return (
    <div className="py-4 text-center">
      <h2 className="text-4xl leading-tight font-semibold tracking-tight text-ink">
        Ship your{" "}
        <TextHighlighter variant="marker" duration={900}>
          design system
        </TextHighlighter>{" "}
        before the next sprint
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-muted">
        One set of components for Blade, React, and Vue, with tokens your team
        already knows.
      </p>
    </div>
  );
}
