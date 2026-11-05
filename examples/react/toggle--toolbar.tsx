import { Toggle } from "../../components/toggle/Toggle";

export default function ToggleToolbarExample() {
  return (
    <div className="flex items-center justify-center">
      <div
        role="group"
        aria-label="Formatting"
        className="flex items-center gap-1 rounded-lg border border-line bg-surface p-1"
      >
        <Toggle size="sm" aria-label="Bold" defaultPressed>
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
            <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" />
          </svg>
        </Toggle>
        <Toggle size="sm" aria-label="Italic">
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
            <path d="M10 4h9M5 20h9M15 4 9 20" />
          </svg>
        </Toggle>
        <Toggle size="sm" aria-label="Underline">
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
            <path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14" />
          </svg>
        </Toggle>
        <Toggle size="sm" aria-label="Strikethrough" disabled>
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
            <path d="M5 12h14M16 6.5A4 4 0 0 0 12 5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1a4 4 0 0 1-4-1.5" />
          </svg>
        </Toggle>
      </div>
    </div>
  );
}
