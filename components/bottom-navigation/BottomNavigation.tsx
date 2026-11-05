"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";

const root =
  "flex items-center gap-2 transition-transform duration-300 ease-out data-[state=collapsed]:translate-y-1 motion-reduce:transition-none";
const nav =
  "relative min-w-0 flex-1 rounded-full border border-line bg-surface/85 p-1.5 shadow-overlay backdrop-blur-md";
const pill =
  "absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/var(--bn-count))] translate-x-[calc(var(--bn-index)*100%)] rounded-full bg-primary-soft transition-transform duration-500 ease-[cubic-bezier(0.34,1.36,0.5,1)] motion-reduce:transition-none";
const list = "relative grid auto-cols-fr grid-flow-col";
const itemClass =
  "group/item relative flex h-14 w-full items-center justify-center rounded-full text-muted transition-[color,height] duration-300 ease-out select-none hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:text-ink motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:h-11";
const iconWrap =
  "relative transition-transform duration-300 ease-out group-active/item:scale-90 motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:-translate-y-2.5";
const iconClass = "size-6";
const badgeClass =
  "absolute -top-1 -right-2 h-4 min-w-4 rounded-full bg-danger px-1 text-center text-[10px] leading-4 font-semibold text-on-primary";
const labelClass =
  "pointer-events-none absolute inset-x-1 bottom-1.5 translate-y-1 truncate text-center text-xs leading-4 font-medium opacity-0 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none [[data-bottom-nav=expanded]_[aria-current=page]_&]:translate-y-0 [[data-bottom-nav=expanded]_[aria-current=page]_&]:opacity-100";
const srOnly = "sr-only";
const actionClass =
  "grid size-14 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-overlay transition-[background-color,width,height,scale] duration-300 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 motion-reduce:transition-none [[data-bottom-nav=collapsed]_&]:size-11";

/** Scroll distance before the bar reacts, and how far down the content must be before it collapses. */
const SCROLL_DELTA = 4;
const COLLAPSE_AFTER = 32;

/** Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#". */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type BottomNavigationItem = {
  value: string;
  label: string;
  /** Path data (the d attribute) for a 24x24 stroked icon. */
  icon: string;
  href?: string;
  /** Small count shown on the icon. */
  badge?: number | string;
};

export type BottomNavigationProps = Omit<
  ComponentProps<"div">,
  "defaultValue"
> & {
  items: BottomNavigationItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Collapse to icons while the content around the bar scrolls down. */
  shrinkOnScroll?: boolean;
  /** Icon for the round action button. The button only renders when set. */
  action?: ReactNode;
  onAction?: () => void;
  navLabel?: string;
  actionLabel?: string;
  badgeLabel?: string;
};

export function BottomNavigation({
  items,
  value,
  defaultValue,
  onValueChange,
  shrinkOnScroll = false,
  action,
  onAction,
  navLabel = "Main",
  actionLabel = "Create",
  badgeLabel = "{count} new",
  className,
  ...props
}: BottomNavigationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(defaultValue ?? items[0]?.value);
  const [collapsed, setCollapsed] = useState(false);
  const active = value ?? inner;
  const index = Math.max(
    items.findIndex((item) => item.value === active),
    0,
  );
  const state = collapsed ? "collapsed" : "expanded";

  useEffect(() => {
    if (!shrinkOnScroll) return;
    let last: EventTarget | null = null;
    let lastTop = 0;
    const onScroll = (event: Event) => {
      const target = event.target as Element | Document;
      const scope = rootRef.current?.parentElement;
      if (target !== document && !scope?.contains(target as Element)) return;
      const top = target === document ? scrollY : (target as Element).scrollTop;
      if (target !== last) [last, lastTop] = [target, 0];
      if (Math.abs(top - lastTop) < SCROLL_DELTA) return;
      setCollapsed(top > lastTop && top > COLLAPSE_AFTER);
      lastTop = top;
    };
    const options = { capture: true, passive: true };
    document.addEventListener("scroll", onScroll, options);
    return () => document.removeEventListener("scroll", onScroll, options);
  }, [shrinkOnScroll]);

  const select = (next: string) => {
    setInner(next);
    setCollapsed(false);
    onValueChange?.(next);
  };

  return (
    <div
      ref={rootRef}
      data-state={state}
      data-bottom-nav={state}
      className={cx(root, className)}
      {...props}
    >
      <nav
        aria-label={navLabel}
        className={nav}
        style={
          { "--bn-count": items.length, "--bn-index": index } as CSSProperties
        }
      >
        <span aria-hidden="true" className={pill} />
        <ul className={list}>
          {items.map((item) => {
            const current = item.value === active ? "page" : undefined;
            const content = (
              <>
                <span className={iconWrap}>
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
                  {item.badge !== undefined && (
                    <span aria-hidden="true" className={badgeClass}>
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className={labelClass}>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={srOnly}>
                    {badgeLabel.replace("{count}", String(item.badge))}
                  </span>
                )}
              </>
            );
            return (
              <li key={item.value}>
                {item.href ? (
                  <a
                    href={safeHref(item.href)}
                    aria-current={current}
                    className={itemClass}
                    onClick={() => select(item.value)}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-current={current}
                    className={itemClass}
                    onClick={() => select(item.value)}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {action && (
        <button
          type="button"
          aria-label={actionLabel}
          className={actionClass}
          onClick={onAction}
        >
          {action}
        </button>
      )}
    </div>
  );
}
