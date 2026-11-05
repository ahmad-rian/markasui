import { FlipButton } from "../../components/flip-button/FlipButton";

export default function FlipButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <FlipButton backLabel="Let's go">Primary</FlipButton>
      <FlipButton variant="secondary" backLabel="Let's go">
        Secondary
      </FlipButton>
      <FlipButton variant="ghost" backLabel="Let's go">
        Ghost
      </FlipButton>
      <FlipButton variant="danger" backLabel="Are you sure">
        Danger
      </FlipButton>
    </div>
  );
}
