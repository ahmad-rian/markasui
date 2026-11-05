import { Progress } from "../../components/progress/Progress";

export default function ProgressWithoutLabelExample() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Progress value={40} aria-label="Checkout progress" />
        <p className="text-sm text-muted">Step 2 of 5: Shipping address</p>
      </div>
      <div className="grid gap-2">
        <Progress value={90} aria-label="Storage used" />
        <p className="text-sm text-muted">9 GB of 10 GB used</p>
      </div>
    </div>
  );
}
