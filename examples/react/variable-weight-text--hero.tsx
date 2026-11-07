import { VariableWeightText } from "../../components/variable-weight-text/VariableWeightText";

export default function VariableWeightTextHeroExample() {
  return (
    <div className="py-4">
      <h2 className="text-5xl tracking-tight text-ink">
        Type that{" "}
        <VariableWeightText text="reacts" radius={80} min={300} max={900} />
      </h2>
      <p className="mt-4 max-w-sm text-sm text-muted">
        Letters near the cursor get bolder. Works with any variable font that
        has a weight axis.
      </p>
    </div>
  );
}
