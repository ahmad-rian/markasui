import { Button } from "../../components/button/Button";
import { Meteors } from "../../components/meteors/Meteors";

export default function MeteorsNotFoundExample() {
  return (
    <Meteors
      count={30}
      angle={60}
      color="muted"
      seed={8}
      className="dark rounded-xl border border-line bg-canvas px-6 py-12"
    >
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-6xl font-bold tracking-tight text-ink">404</p>
        <h3 className="text-lg font-semibold text-ink">
          Lost somewhere in orbit
        </h3>
        <p className="max-w-72 text-sm text-muted">
          We could not find that page. Try the dashboard or search the docs.
        </p>
        <Button>Back to dashboard</Button>
      </div>
    </Meteors>
  );
}
