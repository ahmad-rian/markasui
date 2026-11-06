import { ImageCompare } from "../../components/image-compare/ImageCompare";

const oldPanel = "grid h-60 content-start gap-3 bg-subtle px-5 pt-14";
const oldText = "text-sm text-muted";
const oldCards = "grid grid-cols-3 gap-2";
const oldCard = "h-12 border border-line bg-surface";
const oldChart = "flex h-16 items-end gap-1";
const oldBar = "w-6 bg-faint/40";
const newPanel = "grid h-60 content-start gap-5 bg-surface px-5 pt-14";
const newHeader = "flex items-baseline justify-between gap-4";
const newLabel = "text-sm text-muted";
const newValue = "flex items-baseline gap-2 text-2xl font-semibold text-ink";
const newBadge = "text-sm font-medium text-success";
const newChart = "flex h-20 items-end gap-2";
const newBar = "flex-1 rounded-t-md bg-primary/80";
const newLast = "flex-1 rounded-t-md bg-success";

const bars = ["h-[40%]", "h-[65%]", "h-[50%]", "h-[80%]", "h-[60%]", "h-[90%]"];

export default function ImageCompareRedesignExample() {
  return (
    <ImageCompare
      aria-label="Revenue widget redesign"
      beforeLabel="Old"
      afterLabel="New"
      before={
        <div className={oldPanel}>
          <p className={oldText}>Revenue: 48210 USD</p>
          <div className={oldCards}>
            <div className={oldCard}></div>
            <div className={oldCard}></div>
            <div className={oldCard}></div>
          </div>
          <div className={oldChart}>
            {bars.map((height) => (
              <div key={height} className={`${oldBar} ${height}`}></div>
            ))}
          </div>
        </div>
      }
      after={
        <div className={newPanel}>
          <div className={newHeader}>
            <p className={newLabel}>Revenue this month</p>
            <p className={newValue}>
              $48,210 <span className={newBadge}>+12%</span>
            </p>
          </div>
          <div className={newChart}>
            {bars.map((height, index) => (
              <div
                key={height}
                className={`${index === bars.length - 1 ? newLast : newBar} ${height}`}
              ></div>
            ))}
          </div>
        </div>
      }
    />
  );
}
