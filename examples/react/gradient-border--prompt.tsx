import { GradientBorder } from "../../components/gradient-border/GradientBorder";

export default function GradientBorderPromptExample() {
  return (
    <div className="p-6">
      <GradientBorder radius="lg" speed="slow" glow>
        <label className="grid gap-1 p-3">
          <span className="text-sm font-medium text-ink">
            Ask the assistant
          </span>
          <input
            type="text"
            placeholder="Summarize last week's tickets"
            className="h-9 rounded-md bg-surface text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </label>
      </GradientBorder>
    </div>
  );
}
