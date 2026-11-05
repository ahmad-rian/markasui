import { SpotlightCard } from "../../components/spotlight-card/SpotlightCard";

export default function SpotlightCardColorsExample() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SpotlightCard color="success">
        <div className="p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="size-2 rounded-full bg-success" />
            API
          </p>
          <p className="mt-1 text-xs text-muted">Operational, 99.98% uptime</p>
        </div>
      </SpotlightCard>
      <SpotlightCard color="danger">
        <div className="p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="size-2 rounded-full bg-danger" />
            Webhooks
          </p>
          <p className="mt-1 text-xs text-muted">Delayed, fix in progress</p>
        </div>
      </SpotlightCard>
    </div>
  );
}
