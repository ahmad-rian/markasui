import { Button } from "../../components/button/Button";
import { Sparkles } from "../../components/sparkles/Sparkles";

export default function SparklesFixture() {
  return (
    <Sparkles
      density={36}
      className="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <p className="text-sm font-medium text-muted">Setup complete</p>
        <h2 className="text-2xl font-semibold text-balance text-ink">
          Your workspace is ready
        </h2>
        <p className="max-w-80 text-sm text-muted">
          We imported 3 repositories and 12 teammates. Time to ship something.
        </p>
        <Button>Open dashboard</Button>
      </div>
    </Sparkles>
  );
}
