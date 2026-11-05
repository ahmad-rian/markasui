import { Progress } from "../../components/progress/Progress";

export default function ProgressValuesExample() {
  return (
    <div className="grid gap-5">
      <Progress label="Not started" value={0} />
      <Progress label="Profile setup" value={25} />
      <Progress label="Course progress" value={75} />
      <Progress label="Backup complete" value={100} />
    </div>
  );
}
