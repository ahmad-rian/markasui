import { Button } from "../../components/button/Button";

export default function ButtonFixture() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">More</Button>
        <Button variant="danger">Delete</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
