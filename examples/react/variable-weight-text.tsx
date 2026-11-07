import { VariableWeightText } from "../../components/variable-weight-text/VariableWeightText";

export default function VariableWeightTextExample() {
  return (
    <div className="text-center">
      <p className="text-6xl tracking-tight text-ink">
        <VariableWeightText text="Proximity" />
      </p>
      <p className="mt-3 text-sm text-muted">
        Move your cursor across the letters
      </p>
    </div>
  );
}
