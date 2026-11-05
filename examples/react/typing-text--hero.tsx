import { TypingText } from "../../components/typing-text/TypingText";

export default function TypingTextHeroExample() {
  return (
    <div className="py-4 text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-ink">
        Your team ships
        <br />
        <TypingText
          words={["faster", "with confidence", "every Friday"]}
          className="underline decoration-success decoration-2 underline-offset-8"
        />
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
        One component library for Blade, React, and Vue, with the same classes
        everywhere.
      </p>
      <button
        type="button"
        className="mt-6 h-10 rounded-lg bg-primary px-4 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Get started
      </button>
    </div>
  );
}
