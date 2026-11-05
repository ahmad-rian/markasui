import { Kbd } from "../../components/kbd/Kbd";

export default function KbdFixture() {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-sm text-ink">
      Press <Kbd keys={["Ctrl", "K"]} /> to search, or <Kbd>Esc</Kbd> to close.
    </p>
  );
}
