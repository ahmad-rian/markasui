import { Toggle } from "../../components/toggle/Toggle";

export default function ToggleVariantsExample() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-center gap-2">
        <Toggle>Wrap lines</Toggle>
        <Toggle defaultPressed>Show grid</Toggle>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Toggle variant="outline">Subscribe</Toggle>
        <Toggle variant="outline" defaultPressed>
          Following
        </Toggle>
      </div>
    </div>
  );
}
