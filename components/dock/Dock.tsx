"use client";

import {
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

const root =
  "relative inline-flex h-[60px] items-end gap-2 rounded-2xl border border-line bg-surface/80 px-2.5 pb-2.5 shadow-overlay backdrop-blur-md";
const itemWrap =
  "relative h-10 w-[calc(2.5rem*var(--dock-scale,1))] shrink-0 transition-[width] duration-150 ease-out motion-reduce:transition-none";
const itemClass =
  "group/dock absolute bottom-0 left-0 grid aspect-square w-full place-items-center rounded-xl border border-line bg-linear-to-b from-surface to-subtle text-ink transition-colors duration-150 ease-out hover:to-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const iconClass = "size-[55%]";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-primary px-2 py-1 text-xs font-medium whitespace-nowrap text-on-primary opacity-0 shadow-overlay transition-[opacity,translate] duration-150 ease-out group-hover/dock:translate-y-0 group-hover/dock:opacity-100 group-focus-visible/dock:translate-y-0 group-focus-visible/dock:opacity-100 motion-reduce:transition-none";
const dot =
  "absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink";
const separator = "mx-0.5 mb-1 h-8 w-px shrink-0 bg-line";

/** Pointer distance in px over which neighbours still grow, and the launch bounce. */
const RANGE = 140;
const BOUNCE = [
  { transform: "none" },
  { transform: "translateY(-12px)" },
  { transform: "none" },
];
const BOUNCE_TIMING = { duration: 450, easing: "cubic-bezier(0.3, 0, 0.3, 1)" };

/** Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#". */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Grow every item by its distance to x with a cosine falloff. x null resets the dock. */
function magnify(
  root: HTMLElement | null,
  magnification: number,
  x: number | null,
) {
  const off = x === null || still();
  for (const item of root?.querySelectorAll<HTMLElement>("[data-dock-item]") ??
    []) {
    const rect = item.getBoundingClientRect();
    const distance = off ? RANGE : Math.abs(x - rect.left - rect.width / 2);
    const scale =
      distance >= RANGE
        ? 1
        : 1 +
          ((magnification - 1) * (1 + Math.cos((Math.PI * distance) / RANGE))) /
            2;
    item.style.setProperty("--dock-scale", String(scale));
  }
}

const centerOf = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.left + rect.width / 2;
};

export type DockItem =
  | {
      separator?: false;
      label: string;
      /** Path data (the d attribute) for a 24x24 stroked icon. */
      icon: string;
      value?: string;
      href?: string;
      /** Shows the dot under the item, like an open app. */
      active?: boolean;
    }
  | { separator: true };

export type DockProps = Omit<ComponentProps<"div">, "onSelect"> & {
  items: DockItem[];
  /** How large the item under the pointer or focus grows. 1 turns it off. */
  magnification?: number;
  onItemSelect?: (value: string) => void;
  dockLabel?: string;
};

export function Dock({
  items,
  magnification = 1.6,
  onItemSelect,
  dockLabel = "Dock",
  className,
  ...props
}: DockProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const controls = () =>
    Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>(
        "[data-dock-item] > :first-child",
      ) ?? [],
    );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const all = controls();
    const index = all.indexOf(event.target as HTMLElement);
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % all.length,
      ArrowLeft: (index - 1 + all.length) % all.length,
      Home: 0,
      End: all.length - 1,
    };
    const target = targets[event.key];
    if (index < 0 || target === undefined) return;
    event.preventDefault();
    all[target]?.focus();
  };
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const index = controls().indexOf(event.target);
    if (index < 0) return;
    setFocusIndex(index);
    magnify(rootRef.current, magnification, centerOf(event.target));
  };
  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget))
      magnify(rootRef.current, magnification, null);
  };
  const onLeave = () => {
    const focused = rootRef.current?.contains(document.activeElement);
    magnify(
      rootRef.current,
      magnification,
      focused ? centerOf(document.activeElement!) : null,
    );
  };
  const launch = (event: MouseEvent<HTMLElement>, value: string) => {
    if (!still()) event.currentTarget.animate?.(BOUNCE, BOUNCE_TIMING);
    onItemSelect?.(value);
  };

  /** Position of each item among the focusable ones, -1 for separators. */
  const positions = items.reduce<number[]>(
    (list, item) => [
      ...list,
      item.separator ? -1 : list.filter((position) => position >= 0).length,
    ],
    [],
  );
  return (
    <div
      ref={rootRef}
      role="toolbar"
      aria-label={dockLabel}
      aria-orientation="horizontal"
      className={cx(root, className)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerMove={(event) =>
        magnify(rootRef.current, magnification, event.clientX)
      }
      onPointerLeave={onLeave}
      {...props}
    >
      {items.map((item, index) => {
        if (item.separator)
          return (
            <div
              key={index}
              role="separator"
              aria-orientation="vertical"
              className={separator}
            />
          );
        const shared = {
          tabIndex: positions[index] === focusIndex ? 0 : -1,
          "aria-current": item.active ? ("true" as const) : undefined,
          className: itemClass,
          onClick: (event: MouseEvent<HTMLElement>) =>
            launch(event, item.value ?? item.label),
        };
        const content = (
          <>
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={item.icon} />
            </svg>
            <span className={tooltip}>{item.label}</span>
          </>
        );
        return (
          <div key={index} data-dock-item="" className={itemWrap}>
            {item.href ? (
              <a href={safeHref(item.href)} {...shared}>
                {content}
              </a>
            ) : (
              <button type="button" {...shared}>
                {content}
              </button>
            )}
            {item.active && <span aria-hidden="true" className={dot} />}
          </div>
        );
      })}
    </div>
  );
}
