import { HoverCard } from "../../components/hover-card/HoverCard";

const mark = [
  { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
  { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
  {
    points: "421,762 1325,318 1240,611 336,1050",
    className: "fill-success/35",
  },
  { points: "265,1073 1169,629 1084,922 180,1362", className: "fill-ink/25" },
  { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
  {
    points: "347,1135 1251,691 1166,984 262,1424",
    className: "fill-success",
  },
];
export default function HoverCardFixture() {
  return (
    <div className="flex justify-center py-6">
      <HoverCard
        content={
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-canvas">
              <svg
                className="size-6"
                viewBox="0 0 1464 1430"
                aria-hidden="true"
              >
                {mark.map((shape) => (
                  <polygon
                    key={shape.points}
                    points={shape.points}
                    className={shape.className}
                  />
                ))}
              </svg>
            </span>
            <div className="grid gap-1">
              <p className="font-medium text-ink">MarkasUI</p>
              <p className="text-muted">
                UI components for Blade, React, and Vue.
              </p>
              <p className="text-xs text-muted">Joined March 2026</p>
            </div>
          </div>
        }
      >
        <a
          href="https://github.com/markasui"
          className="rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          @markasui
        </a>
      </HoverCard>
    </div>
  );
}
