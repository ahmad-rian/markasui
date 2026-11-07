import { Magnet } from "../../components/magnet/Magnet";

const footer =
  "flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4";
const text = "text-sm text-muted";
const row = "flex items-center gap-3";
const link =
  "grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-5";

export default function MagnetSocialExample() {
  return (
    <footer className={footer}>
      <p className={text}>Follow Markas Studio</p>
      <div className={row}>
        <Magnet strength={0.5} radius={32}>
          <a href="#" aria-label="Email" className={link}>
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
              <path d="M4 6h16v12H4z"></path>
              <path d="m4 7 8 6 8-6"></path>
            </svg>
          </a>
        </Magnet>
        <Magnet strength={0.5} radius={32}>
          <a href="#" aria-label="Community chat" className={link}>
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
              <path d="M4 5h16v11H9l-5 4V5Z"></path>
            </svg>
          </a>
        </Magnet>
        <Magnet strength={0.5} radius={32}>
          <a href="#" aria-label="Videos" className={link}>
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
              <path d="M4 6h16v12H4z"></path>
              <path d="m10 9 5 3-5 3V9Z"></path>
            </svg>
          </a>
        </Magnet>
        <Magnet strength={0.5} radius={32}>
          <a href="#" aria-label="Website" className={link}>
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
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
              <path d="M3 12h18"></path>
              <path d="M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9Z"></path>
            </svg>
          </a>
        </Magnet>
      </div>
    </footer>
  );
}
