import { ImageTrail } from "../../components/image-trail/ImageTrail";

const area =
  "grid h-72 content-center justify-items-center rounded-xl border border-line bg-subtle p-6 text-center";
const cards = [
  "block h-20 w-16 rounded-lg bg-primary",
  "block h-20 w-16 rounded-lg bg-success",
  "block h-20 w-16 rounded-lg bg-warning",
  "block h-20 w-16 rounded-lg bg-danger",
  "block h-20 w-16 rounded-lg bg-primary-soft",
];
const title = "text-lg font-semibold text-ink";
const hint = "mt-1 text-sm text-muted";

export default function ImageTrailExample() {
  return (
    <ImageTrail
      className={area}
      items={cards.map((card) => (
        <span key={card} className={card}></span>
      ))}
    >
      <p className={title}>Move your cursor here</p>
      <p className={hint}>Color cards follow the pointer and fade away</p>
    </ImageTrail>
  );
}
