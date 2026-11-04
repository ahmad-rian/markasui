import { useId, type ComponentProps, type ReactNode } from "react";

const root = "w-full divide-y divide-line border-y border-line";
const item = "group";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pb-4 text-sm text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type AccordionItem = {
  value: string;
  title: ReactNode;
  content: ReactNode;
};

export type AccordionProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
};

export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
  ...props
}: AccordionProps) {
  const generatedName = useId();
  const defaults = ([] as string[]).concat(defaultValue ?? []);
  const openValues = type === "single" ? defaults.slice(0, 1) : defaults;
  const name = type === "single" ? generatedName : undefined;

  return (
    <div className={cx(root, className)} {...props}>
      {items.map((entry) => (
        <details
          key={entry.value}
          className={item}
          name={name}
          open={openValues.includes(entry.value)}
        >
          <summary className={summary}>
            <span>{entry.title}</span>
            <svg
              className={icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className={content}>{entry.content}</div>
        </details>
      ))}
    </div>
  );
}
