import { ElasticLine } from "../../components/elastic-line/ElasticLine";

const wrap = "grid justify-items-start py-4";
const eyebrow = "text-sm font-medium text-primary";
const title = "mt-1 text-3xl font-semibold text-ink";
const line = "w-48";
const text = "max-w-80 text-sm text-muted";

export default function ElasticLineHeadingExample() {
  return (
    <div className={wrap}>
      <p className={eyebrow}>New in Markas</p>
      <h3 className={title}>Build faster, ship calmer</h3>
      <ElasticLine
        variant="pluck"
        color="primary"
        strokeWidth={3}
        reach={16}
        playOnView
        decorative
        className={line}
      />
      <p className={text}>
        Touch the underline and pull: it slips free and vibrates like a string.
      </p>
    </div>
  );
}
