import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Separator } from "../../components/separator/Separator";

export default function SeparatorLabelExample() {
  return (
    <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
      <Button variant="secondary" className="w-full">
        Continue with GitHub
      </Button>
      <Separator label="or" />
      <Input type="email" label="Email" placeholder="you@example.com" />
    </div>
  );
}
