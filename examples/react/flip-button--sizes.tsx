import { FlipButton } from "../../components/flip-button/FlipButton";

export default function FlipButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <FlipButton size="sm" backLabel="Free">
        Small
      </FlipButton>
      <FlipButton backLabel="Free">Medium</FlipButton>
      <FlipButton size="lg" backLabel="Free">
        Large
      </FlipButton>
    </div>
  );
}
