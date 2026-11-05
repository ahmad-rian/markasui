import { RippleButton } from "../../components/ripple-button/RippleButton";

export default function RippleButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RippleButton size="sm">Small</RippleButton>
      <RippleButton>Medium</RippleButton>
      <RippleButton size="lg">Large</RippleButton>
    </div>
  );
}
