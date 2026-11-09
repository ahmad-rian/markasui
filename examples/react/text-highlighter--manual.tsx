import { useState } from "react";
import { TextHighlighter } from "../../components/text-highlighter/TextHighlighter";

const primary =
  "inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const outline =
  "inline-flex h-9 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function TextHighlighterManualExample() {
  const [active, setActive] = useState(false);
  return (
    <div className="grid gap-4">
      <p className="text-base leading-7 text-muted">
        Before you publish, check that the{" "}
        <TextHighlighter trigger="manual" active={active}>
          title fits in 60 characters
        </TextHighlighter>
        , every image has{" "}
        <TextHighlighter
          trigger="manual"
          active={active}
          color="success"
          delay={250}
        >
          alt text
        </TextHighlighter>
        , and the summary answers{" "}
        <TextHighlighter
          trigger="manual"
          active={active}
          color="danger"
          delay={500}
        >
          one clear question
        </TextHighlighter>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={primary}
          onClick={() => setActive(true)}
        >
          Highlight
        </button>
        <button
          type="button"
          className={outline}
          onClick={() => setActive(false)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
