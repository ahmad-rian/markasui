import { Kbd } from "../../components/kbd/Kbd";

export default function KbdSearchExample() {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
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
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span>Search docs</span>
      <Kbd
        size="sm"
        keys={["Ctrl", "K"]}
        className="ml-auto"
        aria-hidden="true"
      />
    </button>
  );
}
