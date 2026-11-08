import { Button } from "../../components/button/Button";
import { Sparkles } from "../../components/sparkles/Sparkles";

export default function SparklesHeadingExample() {
  return (
    <div className="grid justify-items-center gap-4 rounded-xl border border-line bg-surface px-6 py-10 text-center">
      <Sparkles variant="text" density={18} size="sm" className="px-6 py-4">
        <h3 className="text-3xl font-semibold tracking-tight text-ink">
          Meet Markas Pro
        </h3>
      </Sparkles>
      <p className="max-w-72 text-sm text-muted">
        Every component, every template, and early access to what we build next.
      </p>
      <Button>See what is new</Button>
    </div>
  );
}
