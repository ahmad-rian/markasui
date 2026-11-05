import { Kbd } from "../../components/kbd/Kbd";

export default function KbdSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <Kbd size="sm">Enter</Kbd>
        <Kbd size="sm" keys={["Shift", "Tab"]} />
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Enter</Kbd>
        <Kbd keys={["Shift", "Tab"]} />
      </div>
    </div>
  );
}
