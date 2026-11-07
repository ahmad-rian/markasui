import { DragElements } from "../../components/drag-elements/DragElements";

const box = "rounded-xl border border-line bg-surface p-5";
const title = "text-sm font-semibold text-ink";
const hint = "text-sm text-muted";
const board = "mt-4 h-44 rounded-lg bg-subtle";
const chip =
  "rounded-full border border-primary-line bg-primary-soft px-3 py-1.5 text-sm font-medium text-ink";

export default function DragElementsReturnExample() {
  return (
    <div className={box}>
      <p className={title}>Stack we love</p>
      <p className={hint}>Pull a tag, it springs back</p>
      <DragElements
        release="return"
        rotate={12}
        seed={4}
        className={board}
        role="group"
        aria-label="Skills"
      >
        <span className={chip}>Laravel</span>
        <span className={chip}>Vue</span>
        <span className={chip}>React</span>
        <span className={chip}>Tailwind CSS</span>
        <span className={chip}>Alpine.js</span>
        <span className={chip}>Figma</span>
      </DragElements>
    </div>
  );
}
