import { Progress } from "../../components/progress/Progress";

export default function ProgressStepsExample() {
  return (
    <div className="grid gap-5">
      <Progress label="Onboarding tasks" value={3} max={5} />
      <Progress label="Lessons watched" value={7} max={12} />
    </div>
  );
}
