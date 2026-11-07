import { TextScramble } from "../../components/text-scramble/TextScramble";

export default function TextScrambleStatsExample() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-xs text-muted">Revenue</p>
        <p className="mt-1 text-xl font-semibold text-ink">
          <TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
        </p>
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-xs text-muted">Uptime</p>
        <p className="mt-1 text-xl font-semibold text-ink">
          <TextScramble
            text="99.98%"
            trigger="view"
            charset="digits"
            delay={150}
          />
        </p>
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-xs text-muted">Active teams</p>
        <p className="mt-1 text-xl font-semibold text-ink">
          <TextScramble
            text="1,284"
            trigger="view"
            charset="digits"
            delay={300}
          />
        </p>
      </div>
    </div>
  );
}
