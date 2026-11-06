import { ImageCompare } from "../../components/image-compare/ImageCompare";

const figure = "grid gap-2";
const caption = "text-sm text-muted";
const frame =
  "relative grid aspect-[3/2] w-full place-items-center bg-linear-to-br from-primary-soft via-surface to-warning/25";
const shadow = "absolute bottom-7 h-3 w-28 rounded-full bg-ink/15 blur-sm";
const bottle =
  "relative mt-6 h-40 w-20 rounded-t-[2.5rem] rounded-b-2xl bg-linear-to-b from-success/70 to-success";
const cap =
  "absolute -top-5 left-1/2 h-6 w-8 -translate-x-1/2 rounded-md bg-ink";
const label =
  "absolute inset-x-2 top-14 rounded-md bg-surface/90 py-2.5 text-center text-xs font-semibold text-ink";

/** One deterministic product shot, flat and soft (before) or crisp (after). */
const shot = (tone: string) => (
  <div className={`${frame} ${tone}`}>
    <span className={shadow}></span>
    <div className={bottle}>
      <span className={cap}></span>
      <span className={label}>Calm</span>
    </div>
  </div>
);

export default function ImageCompareRetouchExample() {
  return (
    <figure className={figure}>
      <ImageCompare
        aria-label="Product photo, original and retouched"
        beforeLabel="Original"
        afterLabel="Retouched"
        before={shot("blur-[1.5px] brightness-90 grayscale-[0.6]")}
        after={shot("")}
      />
      <figcaption className={caption}>
        Drag the handle to compare the studio retouch.
      </figcaption>
    </figure>
  );
}
