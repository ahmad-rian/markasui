import { TypingText } from "../../components/typing-text/TypingText";

export default function TypingTextInlineExample() {
  return (
    <p className="text-base text-muted">
      Your order is{" "}
      <TypingText
        words={["packed", "on its way", "out for delivery"]}
        cursor={false}
        className="font-medium text-ink"
      />
    </p>
  );
}
