import { ShimmerButton } from "../../components/shimmer-button/ShimmerButton";

export default function ShimmerButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ShimmerButton>Upgrade</ShimmerButton>
      <ShimmerButton variant="secondary">Book a demo</ShimmerButton>
      <ShimmerButton variant="ghost">What is new</ShimmerButton>
      <ShimmerButton variant="danger">Go live</ShimmerButton>
    </div>
  );
}
