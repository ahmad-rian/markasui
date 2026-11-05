import { RippleButton } from "../../components/ripple-button/RippleButton";

export default function RippleButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RippleButton>Primary</RippleButton>
      <RippleButton variant="secondary">Secondary</RippleButton>
      <RippleButton variant="ghost">Ghost</RippleButton>
      <RippleButton variant="danger">Danger</RippleButton>
    </div>
  );
}
