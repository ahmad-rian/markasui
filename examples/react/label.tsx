import { Label } from "../../components/label/Label";

export default function LabelFixture() {
  return (
    <div className="grid gap-3">
      <Label required>Full name</Label>
      <Label optional>Company</Label>
      <Label>Email</Label>
    </div>
  );
}
