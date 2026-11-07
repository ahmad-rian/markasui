import { VariableWeightText } from "../../components/variable-weight-text/VariableWeightText";

export default function VariableWeightTextWaveExample() {
  return (
    <div className="text-center">
      <p className="text-5xl tracking-tight text-ink">
        <VariableWeightText
          text="Breathe in, breathe out"
          wave
          min={200}
          max={700}
        />
      </p>
    </div>
  );
}
