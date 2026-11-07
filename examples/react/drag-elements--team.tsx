import { DragElements } from "../../components/drag-elements/DragElements";

const board = "h-80 rounded-xl border border-line bg-canvas";
const card =
  "flex w-48 items-center gap-3 rounded-xl border border-line bg-surface p-3";
const avatar =
  "grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
const name = "block text-sm font-semibold text-ink";
const role = "block text-xs text-muted";

export default function DragElementsTeamExample() {
  return (
    <DragElements
      release="stay"
      rotate={0}
      className={board}
      role="group"
      aria-label="Team"
    >
      <div data-x="8" data-y="10" data-rotate="-3" className={card}>
        <span aria-hidden="true" className={avatar}>
          RP
        </span>
        <span>
          <span className={name}>Rania Putri</span>
          <span className={role}>Design lead</span>
        </span>
      </div>
      <div data-x="92" data-y="30" data-rotate="2" className={card}>
        <span aria-hidden="true" className={avatar}>
          BS
        </span>
        <span>
          <span className={name}>Bima Saputra</span>
          <span className={role}>Engineering</span>
        </span>
      </div>
      <div data-x="12" data-y="70" data-rotate="2" className={card}>
        <span aria-hidden="true" className={avatar}>
          SA
        </span>
        <span>
          <span className={name}>Sekar Ayu</span>
          <span className={role}>Product</span>
        </span>
      </div>
      <div data-x="88" data-y="92" data-rotate="-2" className={card}>
        <span aria-hidden="true" className={avatar}>
          DP
        </span>
        <span>
          <span className={name}>Dimas Pratama</span>
          <span className={role}>Research</span>
        </span>
      </div>
    </DragElements>
  );
}
