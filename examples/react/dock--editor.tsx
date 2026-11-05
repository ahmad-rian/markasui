import { Dock } from "../../components/dock/Dock";

const items = [
  { label: "Select", icon: "M4 4l7 17 2.5-7.5L21 11z", active: true },
  { label: "Draw", icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" },
  { label: "Shape", icon: "M5 5h14v14H5z" },
  { label: "Text", icon: "M5 6V4h14v2M12 4v16M9 20h6" },
  { separator: true },
  { label: "Undo", icon: "M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" },
  { label: "Redo", icon: "M15 14l5-5-5-5M20 9H9.5a5.5 5.5 0 0 0 0 11H13" },
];

export default function DockEditorExample() {
  return (
    <div className="grid h-56 place-items-end justify-center rounded-xl border border-dashed border-line bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[16px_16px] pb-4">
      <Dock items={items} magnification={1.3} dockLabel="Tools" />
    </div>
  );
}
