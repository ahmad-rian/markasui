import { TiltCard } from "../../components/tilt-card/TiltCard";

const stage = "grid place-items-center py-6";
const card = "w-72 border border-line bg-surface p-6 text-center";
const avatar =
  "mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-success/50 to-primary-soft text-xl font-semibold text-ink";
const name = "mt-4 text-base font-semibold text-ink";
const role = "text-sm text-muted";
const stats = "mt-5 grid grid-cols-3 gap-2 border-y border-line py-3";
const value = "block text-base font-semibold text-ink tabular-nums";
const label = "text-xs text-muted";
const button =
  "mt-5 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line bg-surface text-sm font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const numbers = [
  { value: "48", label: "Projects" },
  { value: "1.2k", label: "Followers" },
  { value: "312", label: "Following" },
];

export default function TiltCardProfileExample() {
  return (
    <div className={stage}>
      <TiltCard maxAngle={8} className={card}>
        <div data-depth="20" aria-hidden="true" className={avatar}>
          AS
        </div>
        <p className={name}>Adi Santoso</p>
        <p className={role}>Product designer, Bandung</p>
        <div className={stats}>
          {numbers.map((stat) => (
            <p key={stat.label}>
              <span className={value}>{stat.value}</span>
              <span className={label}>{stat.label}</span>
            </p>
          ))}
        </div>
        <button type="button" className={button}>
          Follow
        </button>
      </TiltCard>
    </div>
  );
}
