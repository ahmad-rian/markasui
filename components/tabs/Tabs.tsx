"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const root = "w-full";
const list = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const tab =
  "inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const panel =
  "mt-4 rounded-md text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type TabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
};

export type TabsProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  items: TabItem[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  items,
  defaultValue,
  onValueChange,
  id,
  className,
  ...props
}: TabsProps) {
  const generatedId = useId();
  const tabsId = id ?? generatedId;
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (value: string) => {
    setActive(value);
    onValueChange?.(value);
  };
  const focusTab = (value: string) => {
    select(value);
    tabRefs.current[value]?.focus();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = items.map((item) => item.value);
    const index = keys.indexOf(active ?? "");
    const targets: Record<string, string | undefined> = {
      ArrowRight: keys[(index + 1) % keys.length],
      ArrowLeft: keys[(index - 1 + keys.length) % keys.length],
      Home: keys[0],
      End: keys[keys.length - 1],
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <div id={tabsId} className={cx(root, className)} {...props}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={list}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[item.value] = node;
              }}
              type="button"
              role="tab"
              id={`${tabsId}-tab-${item.value}`}
              aria-controls={`${tabsId}-panel-${item.value}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              data-state={selected ? "active" : "inactive"}
              onClick={() => select(item.value)}
              className={tab}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const selected = item.value === active;
        return (
          <div
            key={item.value}
            role="tabpanel"
            id={`${tabsId}-panel-${item.value}`}
            aria-labelledby={`${tabsId}-tab-${item.value}`}
            tabIndex={0}
            data-state={selected ? "active" : "inactive"}
            hidden={!selected}
            className={panel}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
