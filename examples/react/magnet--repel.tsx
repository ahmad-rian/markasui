import { Magnet } from "../../components/magnet/Magnet";

const card =
  "grid h-56 place-items-center rounded-xl border border-dashed border-line bg-subtle text-center";
const hint = "text-sm text-muted";
const voucher =
  "mx-auto mt-3 rounded-lg border-2 border-dashed border-success bg-surface px-4 py-2 text-lg font-semibold text-ink tabular-nums";

export default function MagnetRepelExample() {
  return (
    <div className={card}>
      <div>
        <p className={hint}>Catch the voucher if you can</p>
        <Magnet mode="repel" strength={0.6} radius={70} className={voucher}>
          Rp 50.000 off
        </Magnet>
      </div>
    </div>
  );
}
