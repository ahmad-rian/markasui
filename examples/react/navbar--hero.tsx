import { useState, type UIEvent } from "react";
import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

const features = [
  {
    title: "Three frameworks",
    text: "Blade, React, and Vue share the same classes and variants.",
  },
  {
    title: "Native first",
    text: "Dialog, Popover API, and details before any extra script.",
  },
  {
    title: "Tokens only",
    text: "Fifteen colour tokens keep light and dark mode in step.",
  },
];

/** Scroll distance in pixels after which the bar turns solid. */
const SOLID_AFTER = 8;

const frame =
  "dark h-[460px] overflow-hidden rounded-2xl border border-line bg-canvas text-ink";
const scroller =
  "@container h-full overflow-y-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
/** Clear over the hero, then the blur variant shows once the page scrolls. */
const bar =
  "border-transparent! bg-transparent! backdrop-blur-none! transition-[background-color,border-color] duration-300 ease-out data-[scrolled=true]:border-line/60! data-[scrolled=true]:bg-surface/75! data-[scrolled=true]:backdrop-blur-md!";
const brand = "flex items-center gap-2 rounded-md";
const logoClass = "size-6";
const hero =
  "relative -mt-14 grid justify-items-center gap-5 overflow-hidden bg-[radial-gradient(70%_55%_at_50%_0%,color-mix(in_oklab,var(--color-success)_38%,transparent),transparent),radial-gradient(50%_40%_at_85%_30%,color-mix(in_oklab,var(--color-ink)_10%,transparent),transparent)] px-6 pt-28 pb-14 text-center";
const lines =
  "absolute inset-0 opacity-50 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-size-[48px_100%] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]";
const pill =
  "relative inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pillDot = "size-1.5 rounded-full bg-success";
const title =
  "relative max-w-sm text-4xl font-semibold tracking-tight text-balance";
const lead = "relative max-w-sm text-sm text-muted text-pretty";
const ctas = "relative flex flex-wrap justify-center gap-2";
const grid = "grid gap-3 px-6 pb-8 @2xl:grid-cols-3";
const card = "grid gap-1 rounded-xl border border-line bg-surface p-4";
const cardTitle = "text-sm font-medium";
const cardText = "text-sm text-muted";

export default function NavbarHeroExample() {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = (event: UIEvent<HTMLElement>) =>
    setScrolled(event.currentTarget.scrollTop > SOLID_AFTER);
  return (
    <div className={frame}>
      <div
        role="region"
        aria-label="Landing page"
        tabIndex={0}
        onScroll={handleScroll}
        className={scroller}
      >
        <Navbar
          links={links}
          variant="blur"
          sticky
          data-scrolled={scrolled}
          className={bar}
          brand={
            <a href="/" className={brand}>
              <svg
                className={logoClass}
                viewBox="0 0 1464 1430"
                aria-hidden="true"
              >
                {logo.map((shape) => (
                  <polygon
                    key={shape.points}
                    className={shape.fill}
                    points={shape.points}
                  />
                ))}
              </svg>
              <span>MarkasUI</span>
            </a>
          }
          actions={<Button size="sm">Get started</Button>}
        />
        <section className={hero}>
          <div aria-hidden="true" className={lines} />
          <a href="/changelog" className={pill}>
            <span aria-hidden="true" className={pillDot} />
            MarkasUI 1.0 is out
          </a>
          <h2 className={title}>Interfaces that feel finished</h2>
          <p className={lead}>
            Scroll this page. The header starts clear over the hero and turns
            solid once content moves under it.
          </p>
          <div className={ctas}>
            <Button>Get started</Button>
            <Button variant="secondary">Browse components</Button>
          </div>
        </section>
        <div className={grid}>
          {features.map((feature) => (
            <div key={feature.title} className={card}>
              <h3 className={cardTitle}>{feature.title}</h3>
              <p className={cardText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
