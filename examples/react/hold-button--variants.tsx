import { HoldButton } from "../../components/hold-button/HoldButton";

export default function HoldButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <HoldButton>Hold to publish</HoldButton>
      <HoldButton variant="secondary">Hold to archive</HoldButton>
      <HoldButton variant="ghost">Hold to reset</HoldButton>
      <HoldButton variant="danger">Hold to delete</HoldButton>
    </div>
  );
}
