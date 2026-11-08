import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { StarsBackground } from "../../components/stars-background/StarsBackground";

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
export default function StarsBackgroundWaitlistExample() {
  return (
    <StarsBackground
      count={150}
      seed={3}
      color="muted"
      className="rounded-xl border border-line bg-canvas p-6"
    >
      <form className="grid gap-4">
        <div className="grid gap-1.5">
          <svg
            className="mb-2 size-8"
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
          <h3 className="text-lg font-semibold text-ink">Join the waitlist</h3>
          <p className="text-sm text-muted">
            Be first to try MarkasUI Pro when invites open this spring.
          </p>
        </div>
        <div className="flex items-end gap-2">
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            className="flex-1"
          />
          <Button type="submit">Request invite</Button>
        </div>
      </form>
    </StarsBackground>
  );
}
