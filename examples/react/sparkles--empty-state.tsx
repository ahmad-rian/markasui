import { Button } from "../../components/button/Button";
import { Sparkles } from "../../components/sparkles/Sparkles";

export default function SparklesEmptyStateExample() {
  return (
    <Sparkles
      color="success"
      size="sm"
      density={20}
      seed={9}
      className="rounded-xl border border-dashed border-line bg-surface px-6 py-10"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <h3 className="text-base font-semibold text-ink">Inbox zero</h3>
        <p className="max-w-64 text-sm text-muted">
          Every review is done. New requests will show up here.
        </p>
        <Button variant="secondary" size="sm">
          View archive
        </Button>
      </div>
    </Sparkles>
  );
}
