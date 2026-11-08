import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

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
const link =
  "rounded-sm transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

export default function ThemeToggleInNavbarExample() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface py-2 pr-2 pl-3">
      <a
        href="#"
        className={`flex items-center gap-2 text-sm font-semibold text-ink ${link}`}
      >
        <svg
          className="size-6 shrink-0"
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
        MarkasUI
      </a>
      <nav
        aria-label="Main"
        className="flex items-center gap-4 text-sm text-muted"
      >
        <a href="#docs" className={link}>
          Docs
        </a>
        <a href="#components" className={link}>
          Components
        </a>
        <a href="#pricing" className={link}>
          Pricing
        </a>
      </nav>
      <ThemeToggle size="sm" animation="eclipse" />
    </header>
  );
}
