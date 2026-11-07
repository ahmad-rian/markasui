import { TextRotate } from "../../components/text-rotate/TextRotate";

export default function TextRotateTeamExample() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-subtle text-sm font-medium text-ink"
      >
        MU
      </span>
      <p className="text-sm text-muted">
        Reviewed by{" "}
        <TextRotate
          words={["Dewi Lestari", "Budi Santoso", "Siti Aminah", "Rizal Hakim"]}
          from="random"
          className="font-medium text-ink"
        />
      </p>
    </div>
  );
}
