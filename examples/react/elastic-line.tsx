import { ElasticLine } from "../../components/elastic-line/ElasticLine";

const wrap = "grid rounded-xl border border-line bg-surface px-6 py-4";
const section = "py-2";
const title = "text-base font-semibold text-ink";
const text = "mt-1 text-sm text-muted";

export default function ElasticLineExample() {
  return (
    <div className={wrap}>
      <section className={section}>
        <h3 className={title}>Release 2.4</h3>
        <p className={text}>Stacking cards, pixel trails, and a faster CLI.</p>
      </section>
      <ElasticLine />
      <section className={section}>
        <h3 className={title}>Release 2.3</h3>
        <p className={text}>Indonesian docs and Rupiah currency input.</p>
      </section>
    </div>
  );
}
