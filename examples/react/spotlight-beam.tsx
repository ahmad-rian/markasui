import { Button } from "../../components/button/Button";
import { SpotlightBeam } from "../../components/spotlight-beam/SpotlightBeam";

export default function SpotlightBeamFixture() {
  return (
    <SpotlightBeam
      follow
      className="dark rounded-xl bg-canvas px-6 py-16 text-ink"
    >
      <div className="grid gap-4">
        <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink">
          Your roadmap, in the spotlight
        </h2>
        <p className="max-w-80 text-sm text-muted">
          Share what is shipping next with a public roadmap your customers can
          vote on.
        </p>
        <div className="flex gap-2">
          <Button>Create a roadmap</Button>
          <Button variant="ghost">View example</Button>
        </div>
      </div>
    </SpotlightBeam>
  );
}
