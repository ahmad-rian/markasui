import { TypingText } from "../../components/typing-text/TypingText";

export default function TypingTextExample() {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-ink">
      Build interfaces for{" "}
      <TypingText words={["Laravel", "React", "Vue"]} className="text-muted" />
    </h2>
  );
}
