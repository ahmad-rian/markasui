import { Badge } from "../../components/badge/Badge";

const css =
  "@keyframes markas-sticker-wobble{0%,100%{transform:rotate(0deg)}50%{transform:rotate(7deg) scale(1.04)}}";

export default function FooterStickersExample() {
  return (
    <footer className="@container w-full text-sm">
      <style>{css}</style>
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-5 pt-6 text-on-primary **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-on-primary @2xl:px-10 @2xl:pt-10">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-2 rounded-md text-base font-semibold"
          >
            <svg
              className="size-7 shrink-0"
              viewBox="0 0 1464 1430"
              aria-hidden="true"
            >
              <polygon
                className="fill-on-primary/15"
                points="354,578 1256,138 1171,430 268,868"
              />
              <polygon
                className="fill-on-primary/50"
                points="553,443 1455,3 1370,295 467,733"
              />
              <polygon
                className="fill-success/30"
                points="421,762 1325,318 1240,611 336,1050"
              />
              <polygon
                className="fill-on-primary/25"
                points="265,1073 1169,629 1084,922 180,1362"
              />
              <polygon
                className="fill-on-primary/75"
                points="93,965 997,521 912,814 8,1253"
              />
              <polygon
                className="fill-success"
                points="347,1135 1251,691 1166,984 262,1424"
              />
            </svg>
            MarkasUI
          </a>
          <a
            href="#top"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-on-primary/25 px-3 text-xs font-medium transition-colors duration-150 ease-out hover:bg-on-primary/10 motion-reduce:transition-none"
          >
            Back to top
            <svg
              className="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
        <div className="mt-10 grid gap-8 @xl:grid-cols-3 @xl:gap-6">
          <div className="grid content-start justify-items-start gap-3">
            <Badge dot={false} className="w-fit -rotate-2">
              looking for a job?
            </Badge>
            <p className="text-lg leading-snug font-semibold text-balance">
              We’re hiring people who sweat the small details.
            </p>
            <a
              href="/careers"
              className="w-fit rounded-sm font-medium underline decoration-on-primary/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-on-primary motion-reduce:transition-none"
            >
              See open roles
            </a>
          </div>
          <div className="grid content-start justify-items-start gap-3">
            <Badge dot={false} className="rotate-1">
              office
            </Badge>
            <address className="text-lg leading-snug font-semibold text-balance not-italic">
              Jl. Kemang Raya 12, Jakarta Selatan, Indonesia
            </address>
            <a
              href="https://maps.google.com/?q=Kemang+Raya+12+Jakarta"
              className="w-fit rounded-sm font-medium underline decoration-on-primary/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-on-primary motion-reduce:transition-none"
            >
              Open in Maps
            </a>
          </div>
          <div className="grid content-start justify-items-start gap-3">
            <Badge dot={false} className="w-fit -rotate-2">
              contact
            </Badge>
            <ul className="grid gap-0.5 text-lg leading-snug font-semibold text-balance">
              <li>
                <a
                  href="mailto:hello@markasui.dev"
                  className="rounded-sm transition-opacity duration-150 ease-out hover:opacity-70 motion-reduce:transition-none"
                >
                  hello@markasui.dev
                </a>
              </li>
              <li>
                <a
                  href="tel:+62215550123"
                  className="rounded-sm transition-opacity duration-150 ease-out hover:opacity-70 motion-reduce:transition-none"
                >
                  +62 21 555 0123
                </a>
              </li>
            </ul>
            <ul
              aria-label="Social media"
              className="flex flex-wrap gap-x-4 gap-y-1"
            >
              <li>
                <a
                  href="https://github.com/markasui"
                  className="w-fit rounded-sm font-medium underline decoration-on-primary/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-on-primary motion-reduce:transition-none"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/markasui"
                  className="w-fit rounded-sm font-medium underline decoration-on-primary/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-on-primary motion-reduce:transition-none"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/markasui"
                  className="w-fit rounded-sm font-medium underline decoration-on-primary/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-on-primary motion-reduce:transition-none"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="relative mt-12 select-none @2xl:mt-16"
        >
          <svg className="block w-full" viewBox="0 0 600 200">
            <text
              x="300"
              y="150"
              textAnchor="middle"
              fontSize="168"
              fontWeight="700"
              fontFamily="'Bradley Hand', 'Segoe Script', 'Comic Sans MS', cursive"
              textLength="560"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinejoin="round"
            >
              markasui
            </text>
            <path
              d="M60 182c120 12 330-8 486-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute top-[2%] left-[3%] w-[15%] animate-[markas-sticker-wobble_4s_ease-in-out_infinite] drop-shadow-[0_6px_0_color-mix(in_oklab,var(--color-ink)_25%,transparent)] motion-reduce:animate-none"
            style={{ rotate: "-14deg" }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              className="fill-warning stroke-canvas"
              strokeWidth="6"
            />
            <circle cx="36" cy="40" r="6" className="fill-on-primary" />
            <circle cx="64" cy="40" r="6" className="fill-on-primary" />
            <path
              d="M28 58c8 16 36 16 44 0"
              fill="none"
              className="stroke-on-primary"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute top-0 right-[5%] w-[17%] animate-[markas-sticker-wobble_4s_ease-in-out_infinite] drop-shadow-[0_6px_0_color-mix(in_oklab,var(--color-ink)_25%,transparent)] [animation-delay:-1.2s] motion-reduce:animate-none"
            style={{ rotate: "12deg" }}
            viewBox="0 0 110 80"
          >
            <rect
              x="4"
              y="4"
              width="102"
              height="72"
              rx="18"
              className="fill-danger"
              strokeWidth="6"
            />
            <rect
              x="4"
              y="4"
              width="102"
              height="72"
              rx="18"
              fill="none"
              className="stroke-canvas"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <text
              x="55"
              y="50"
              textAnchor="middle"
              fontSize="36"
              fontWeight="900"
              fontStyle="italic"
              className="fill-on-primary"
            >
              100
            </text>
            <path
              d="M24 60h60M30 67h46"
              className="stroke-on-primary"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute bottom-[4%] left-[42%] w-[12%] animate-[markas-sticker-wobble_4s_ease-in-out_infinite] drop-shadow-[0_6px_0_color-mix(in_oklab,var(--color-ink)_25%,transparent)] [animation-delay:-2.4s] [animation-duration:5s] motion-reduce:animate-none"
            style={{ rotate: "18deg" }}
            viewBox="0 0 100 100"
          >
            <polygon
              points="50,6 62,36 94,38 69,58 78,90 50,72 22,90 31,58 6,38 38,36"
              className="fill-success"
            />
            <polygon
              points="50,6 62,36 94,38 69,58 78,90 50,72 22,90 31,58 6,38 38,36"
              fill="none"
              className="stroke-canvas"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="absolute top-[34%] right-[29%] w-[8%] animate-[markas-sticker-wobble_4s_ease-in-out_infinite] drop-shadow-[0_6px_0_color-mix(in_oklab,var(--color-ink)_25%,transparent)] [animation-delay:-0.6s] [animation-duration:3s] motion-reduce:animate-none"
            style={{ rotate: "-10deg" }}
            viewBox="0 0 60 100"
          >
            <path d="M38 4 8 56h20l-6 40 32-56H34z" className="fill-warning" />
            <path
              d="M38 4 8 56h20l-6 40 32-56H34z"
              fill="none"
              className="stroke-canvas"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-2 pt-4 text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary">
        <p>© 2026 MarkasUI. Made in Jakarta.</p>
        <nav aria-label="Legal">
          <ul className="flex gap-4">
            <li>
              <a
                href="/privacy"
                className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >
                Terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
