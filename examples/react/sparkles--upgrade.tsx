import { Button } from "../../components/button/Button";
import { Sparkles } from "../../components/sparkles/Sparkles";

export default function SparklesUpgradeExample() {
  return (
    <Sparkles
      variant="burst"
      density={32}
      size="lg"
      className="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <div className="grid justify-items-center gap-4 text-center">
        <h3 className="text-xl font-semibold text-ink">
          You have used 9 of 10 free projects
        </h3>
        <p className="max-w-72 text-sm text-muted">
          Upgrade for unlimited projects, custom domains, and team roles.
        </p>
        <Button>Upgrade now</Button>
      </div>
    </Sparkles>
  );
}
