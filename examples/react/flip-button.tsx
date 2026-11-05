import { FlipButton } from "../../components/flip-button/FlipButton";

export default function FlipButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <FlipButton backLabel="It takes 2 minutes">Create account</FlipButton>
      <FlipButton variant="secondary" backLabel="No card needed">
        Start free trial
      </FlipButton>
    </div>
  );
}
