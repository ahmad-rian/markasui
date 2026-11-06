import { useState } from "react";
import { PromptInput } from "../../components/prompt-input/PromptInput";

const tool =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary-line aria-pressed:bg-primary-soft aria-pressed:text-ink motion-reduce:transition-none";
const icon = "size-3.5";

const tools = [
  {
    label: "Search",
    icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  },
  {
    label: "Reason",
    icon: "M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6",
  },
];

export default function PromptInputToolsExample() {
  const [active, setActive] = useState<string[]>(["Search"]);
  const toggle = (label: string) =>
    setActive((list) =>
      list.includes(label)
        ? list.filter((item) => item !== label)
        : [...list, label],
    );
  return (
    <PromptInput
      placeholderLabel="Ask about your sales, invoices, or stock"
      actions={tools.map((item) => (
        <button
          key={item.label}
          type="button"
          aria-pressed={active.includes(item.label)}
          className={tool}
          onClick={() => toggle(item.label)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={icon}
          >
            <path d={item.icon} />
          </svg>
          {item.label}
        </button>
      ))}
    />
  );
}
