import { Magnet } from "../../components/magnet/Magnet";
import { Button } from "../../components/button/Button";

const section =
  "grid place-items-center gap-5 rounded-xl border border-line bg-surface px-6 py-12 text-center";
const title = "text-2xl font-semibold text-ink";
const text = "mt-2 text-sm text-muted";
const icon = "size-5";

export default function MagnetExample() {
  return (
    <section className={section}>
      <div>
        <p className={title}>Ready when you are</p>
        <p className={text}>Free for small teams. Upgrade when you grow.</p>
      </div>
      <Magnet>
        <Button size="lg">
          Get started{" "}
          <span data-depth="0.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={icon}
            >
              <path d="M5 12h14"></path>
              <path d="m13 6 6 6-6 6"></path>
            </svg>
          </span>
        </Button>
      </Magnet>
    </section>
  );
}
