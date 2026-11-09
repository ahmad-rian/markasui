import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";

const css =
  "@keyframes markas-rider{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}@keyframes markas-birds{0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}}";

export default function FooterEngravedExample() {
  return (
    <footer className="dark @container w-full overflow-hidden rounded-3xl bg-canvas bg-radial-[at_top_left] from-primary-soft to-60% text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary">
      <style>{css}</style>
      <div className="grid gap-10 px-5 pt-10 @2xl:px-10 @2xl:pt-14 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)]">
        <div className="grid content-start gap-5">
          <a
            href="/"
            className="flex w-fit items-center gap-2 rounded-md text-base font-semibold text-ink"
          >
            <svg
              className="size-7 shrink-0"
              viewBox="0 0 1464 1430"
              aria-hidden="true"
            >
              <polygon
                className="fill-ink/15"
                points="354,578 1256,138 1171,430 268,868"
              />
              <polygon
                className="fill-ink/50"
                points="553,443 1455,3 1370,295 467,733"
              />
              <polygon
                className="fill-success/30"
                points="421,762 1325,318 1240,611 336,1050"
              />
              <polygon
                className="fill-ink/25"
                points="265,1073 1169,629 1084,922 180,1362"
              />
              <polygon
                className="fill-ink/75"
                points="93,965 997,521 912,814 8,1253"
              />
              <polygon
                className="fill-success"
                points="347,1135 1251,691 1166,984 262,1424"
              />
            </svg>
            MarkasUI
          </a>
          <p className="max-w-xs font-serif text-2xl leading-snug text-ink italic">
            Interfaces, carefully engraved for the long road.
          </p>
          <ul aria-label="Contact" className="grid gap-2.5">
            <li className="flex items-center gap-2.5">
              <svg
                className="size-4 shrink-0 text-faint"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6" />
              </svg>
              <a
                href="mailto:hello@markasui.dev"
                className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >
                hello@markasui.dev
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg
                className="size-4 shrink-0 text-faint"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              <a
                href="tel:+62215550123"
                className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >
                +62 21 555 0123
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg
                className="size-4 shrink-0 text-faint"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
              <span>Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>
        <div className="grid gap-10">
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-3"
          >
            <div>
              <h3 className="font-medium text-ink">Components</h3>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <a
                    href="/components/button"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Button
                  </a>
                </li>
                <li>
                  <a
                    href="/components/modal"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Modal
                  </a>
                </li>
                <li>
                  <a
                    href="/components/data-table"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Data table
                  </a>
                </li>
                <li>
                  <a
                    href="/components"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    All components
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-ink">Resources</h3>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <a
                    href="/docs"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="/templates"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="/changelog"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="/docs/mcp"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    MCP server
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-ink">Company</h3>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <a
                    href="/about"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <form
            action="/newsletter"
            method="post"
            className="relative max-w-sm"
          >
            <Input
              type="email"
              name="email"
              required
              autoComplete="email"
              label="Letters from the workshop"
              placeholder="you@company.com"
              className="h-11! rounded-full! bg-canvas! pr-12! pl-4!"
            />
            <Button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-1 bottom-1 size-9! rounded-full! px-0!"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line px-5 py-4 text-xs @2xl:px-10">
        <p>© 2026 MarkasUI. Made by hand in Indonesia.</p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
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
            <li>
              <a
                href="/accessibility"
                className="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >
                Accessibility
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <svg
        aria-hidden="true"
        className="block h-auto w-full text-[color-mix(in_oklab,var(--markas-warning)_22%,var(--markas-ink))]"
        viewBox="0 0 800 220"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g opacity="0.85">
          <circle cx="640" cy="74" r="30" strokeWidth="0.8" />
          <circle cx="640" cy="74" r="38" strokeWidth="0.8" />
          <circle cx="640" cy="74" r="46" strokeWidth="0.8" />
          <path
            d="M640 52H640M625.4 57.5H654.6M620.9 63H659.1M618.7 68.5H661.3M618 74H662M618.7 79.5H661.3M620.9 85H659.1M625.4 90.5H654.6M640 96H640"
            strokeWidth="1"
          />
        </g>
        <path
          className="animate-[markas-birds_9s_ease-in-out_infinite] motion-reduce:animate-none"
          d="M470 46q6-6 12 0q6-6 12 0M512 30q4-4 8 0q4-4 8 0M440 62q4-4 8 0q4-4 8 0"
          strokeWidth="1.2"
        />
        <path
          d="M0 135L32 128L64 119L96 112L128 106L160 103L192 105L224 110L256 116L288 123L320 128L352 131L384 131L416 130L448 127L480 124L512 121L544 120L576 120L608 122L640 124L672 128L704 132L736 136L768 140L800 143L800 220L0 220Z"
          className="fill-canvas"
        />
        <path
          d="M0 135L32 128L64 119L96 112L128 106L160 103L192 105L224 110L256 116L288 123L320 128L352 131L384 131L416 130L448 127L480 124L512 121L544 120L576 120L608 122L640 124L672 128L704 132L736 136L768 140L800 143M0 146L32 139L64 130L96 123L128 117L160 114L192 116L224 121L256 127L288 134L320 139L352 142L384 142L416 141L448 138L480 135L512 132L544 131L576 131L608 133L640 135L672 139L704 143L736 147L768 151L800 154M0 153L32 146L64 137L96 130L128 124L160 121L192 123L224 128L256 134L288 141L320 146L352 149L384 149L416 148L448 145L480 142L512 139L544 138L576 138L608 140L640 142L672 146L704 150L736 154L768 158L800 161M0 160L32 153L64 144L96 137L128 131L160 128L192 130L224 135L256 141L288 148L320 153L352 156L384 156L416 155L448 152L480 149L512 146L544 145L576 145L608 147L640 149L672 153L704 157L736 161L768 165L800 168M0 167L32 160L64 151L96 144L128 138L160 135L192 137L224 142L256 148L288 155L320 160L352 163L384 163L416 162L448 159L480 156L512 153L544 152L576 152L608 154L640 156L672 160L704 164L736 168L768 172L800 175M0 174L32 167L64 158L96 151L128 145L160 142L192 144L224 149L256 155L288 162L320 167L352 170L384 170L416 169L448 166L480 163L512 160L544 159L576 159L608 161L640 163L672 167L704 171L736 175L768 179L800 182"
          strokeWidth="1.3"
        />
        <path
          d="M0 169L32 167L64 164L96 158L128 151L160 143L192 133L224 125L256 118L288 114L320 115L352 119L384 127L416 136L448 145L480 153L512 159L544 163L576 164L608 162L640 156L672 148L704 140L736 133L768 132L800 136L800 220L0 220Z"
          className="fill-canvas"
        />
        <path
          d="M0 169L32 167L64 164L96 158L128 151L160 143L192 133L224 125L256 118L288 114L320 115L352 119L384 127L416 136L448 145L480 153L512 159L544 163L576 164L608 162L640 156L672 148L704 140L736 133L768 132L800 136M0 179L32 177L64 174L96 168L128 161L160 153L192 143L224 135L256 128L288 124L320 125L352 129L384 137L416 146L448 155L480 163L512 169L544 173L576 174L608 172L640 166L672 158L704 150L736 143L768 142L800 146M0 185L32 183L64 180L96 174L128 167L160 159L192 149L224 141L256 134L288 130L320 131L352 135L384 143L416 152L448 161L480 169L512 175L544 179L576 180L608 178L640 172L672 164L704 156L736 149L768 148L800 152M0 191L32 189L64 186L96 180L128 173L160 165L192 155L224 147L256 140L288 136L320 137L352 141L384 149L416 158L448 167L480 175L512 181L544 185L576 186L608 184L640 178L672 170L704 162L736 155L768 154L800 158M0 197L32 195L64 192L96 186L128 179L160 171L192 161L224 153L256 146L288 142L320 143L352 147L384 155L416 164L448 173L480 181L512 187L544 191L576 192L608 190L640 184L672 176L704 168L736 161L768 160L800 164M0 203L32 201L64 198L96 192L128 185L160 177L192 167L224 159L256 152L288 148L320 149L352 153L384 161L416 170L448 179L480 187L512 193L544 197L576 198L608 196L640 190L672 182L704 174L736 167L768 166L800 170M0 209L32 207L64 204L96 198L128 191L160 183L192 173L224 165L256 158L288 154L320 155L352 159L384 167L416 176L448 185L480 193L512 199L544 203L576 204L608 202L640 196L672 188L704 180L736 173L768 172L800 176"
          strokeWidth="1.6"
        />
        <g
          className="animate-[markas-rider_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          transform="translate(290 65) scale(0.62)"
          strokeWidth="2.4"
        >
          <path
            d="M20 52C20 42 30 38 45 40L78 38C84 36 88 30 92 24L96 16 100 18 104 14 106 20C110 24 112 30 108 32L100 30C96 36 94 44 90 50 88 58 84 62 82 64L86 84 82 86 76 66C66 68 50 68 40 66L36 86 32 86 32 66C26 62 22 58 20 52Z"
            className="fill-canvas"
          />
          <path d="M44 66l4 20M74 66l-4 20M20 50c-8 2-12 12-10 22M30 50c10 4 30 4 44 0M34 56c10 3 26 3 38 0" />
          <path d="M58 38l4-16M61 28l15 4M60 38l6 12-2 8M70 30l14-24" />
          <circle cx="63" cy="16" r="5" className="fill-canvas" />
        </g>
        <path
          d="M0 177L32 171L64 167L96 166L128 168L160 173L192 178L224 183L256 187L288 187L320 185L352 181L384 175L416 168L448 162L480 158L512 156L544 157L576 160L608 165L640 172L672 178L704 185L736 190L768 193L800 196L800 220L0 220Z"
          className="fill-canvas"
        />
        <path
          d="M0 177L32 171L64 167L96 166L128 168L160 173L192 178L224 183L256 187L288 187L320 185L352 181L384 175L416 168L448 162L480 158L512 156L544 157L576 160L608 165L640 172L672 178L704 185L736 190L768 193L800 196M0 186L32 180L64 176L96 175L128 177L160 182L192 187L224 192L256 196L288 196L320 194L352 190L384 184L416 177L448 171L480 167L512 165L544 166L576 169L608 174L640 181L672 187L704 194L736 199L768 202L800 205M0 191L32 185L64 181L96 180L128 182L160 187L192 192L224 197L256 201L288 201L320 199L352 195L384 189L416 182L448 176L480 172L512 170L544 171L576 174L608 179L640 186L672 192L704 199L736 204L768 207L800 210M0 196L32 190L64 186L96 185L128 187L160 192L192 197L224 202L256 206L288 206L320 204L352 200L384 194L416 187L448 181L480 177L512 175L544 176L576 179L608 184L640 191L672 197L704 204L736 209L768 212L800 215M0 201L32 195L64 191L96 190L128 192L160 197L192 202L224 207L256 211L288 211L320 209L352 205L384 199L416 192L448 186L480 182L512 180L544 181L576 184L608 189L640 196L672 202L704 209L736 214L768 217L800 220M0 206L32 200L64 196L96 195L128 197L160 202L192 207L224 212L256 216L288 216L320 214L352 210L384 204L416 197L448 191L480 187L512 185L544 186L576 189L608 194L640 201L672 207L704 214L736 219L768 222L800 225"
          strokeWidth="1.9"
        />
      </svg>
    </footer>
  );
}
