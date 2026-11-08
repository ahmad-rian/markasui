import { Button } from "../../components/button/Button";
import { Meteors } from "../../components/meteors/Meteors";

export default function MeteorsFixture() {
  return (
    <Meteors className="rounded-xl border border-line bg-surface px-6 py-12">
      <div className="grid max-w-80 gap-4">
        <p className="text-sm font-medium text-muted">Streaming ingest</p>
        <h2 className="text-2xl font-semibold text-balance text-ink">
          A million events a second, without breaking a sweat
        </h2>
        <p className="text-sm text-muted">
          Point your producers at one endpoint and query the results in under a
          second.
        </p>
        <div>
          <Button>View benchmarks</Button>
        </div>
      </div>
    </Meteors>
  );
}
