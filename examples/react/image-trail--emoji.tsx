import { Button } from "../../components/button/Button";
import { ImageTrail } from "../../components/image-trail/ImageTrail";

const area =
  "grid h-72 content-center justify-items-start gap-3 rounded-xl bg-primary-soft p-8";
const emoji = "block text-4xl";
const foods = ["🍜", "🍢", "🌶️", "🥥", "🍌"];
const eyebrow = "text-sm font-medium text-primary";
const title = "max-w-64 text-2xl font-semibold text-ink";
const hint = "text-sm text-muted";

export default function ImageTrailEmojiExample() {
  return (
    <ImageTrail
      variant="scale"
      threshold={32}
      className={area}
      items={foods.map((food) => (
        <span key={food} className={emoji}>
          {food}
        </span>
      ))}
    >
      <p className={eyebrow}>Jl. Braga, Bandung</p>
      <h3 className={title}>Weekend street food market</h3>
      <p className={hint}>40 stalls, Saturday and Sunday from 4 pm</p>
      <Button>See the stalls</Button>
    </ImageTrail>
  );
}
