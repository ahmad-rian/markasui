import { TypingText } from "../../components/typing-text/TypingText";

export default function TypingTextTerminalExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-danger" />
        <span className="size-2.5 rounded-full bg-warning" />
        <span className="size-2.5 rounded-full bg-success" />
      </div>
      <p className="p-4 font-mono text-sm text-ink">
        <span className="text-muted">$ </span>
        <TypingText
          words={["pnpm dlx markasui add marquee"]}
          loop={false}
          typeSpeed={50}
        />
      </p>
    </div>
  );
}
