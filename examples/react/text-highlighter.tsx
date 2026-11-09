import { TextHighlighter } from "../../components/text-highlighter/TextHighlighter";

export default function TextHighlighterExample() {
  return (
    <article className="text-base leading-7 text-muted">
      <h3 className="text-lg font-semibold text-ink">Set the measure first</h3>
      <p className="mt-2">
        Long lines tire the eye, so readers lose their place on the way back.
        Keep body text at <TextHighlighter>45 to 75 characters</TextHighlighter>{" "}
        per line, give it a{" "}
        <TextHighlighter delay={400}>line height near 1.5</TextHighlighter>, and
        let headings sit{" "}
        <TextHighlighter delay={800}>
          closer to the text they introduce
        </TextHighlighter>{" "}
        than to the one above.
      </p>
    </article>
  );
}
