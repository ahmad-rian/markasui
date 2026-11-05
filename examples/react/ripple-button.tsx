import { RippleButton } from "../../components/ripple-button/RippleButton";

export default function RippleButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RippleButton>Add to cart</RippleButton>
      <RippleButton variant="secondary">Save for later</RippleButton>
    </div>
  );
}
