import { Button } from "../../components/button/Button";
import { Tooltip } from "../../components/tooltip/Tooltip";

export default function TooltipHelpIconExample() {
  return (
    <div className="flex items-center justify-center gap-1 py-10">
      <span className="text-sm font-medium text-ink">Tax ID</span>
      <Tooltip content="Your 15 digit tax number. It appears on every invoice we send you.">
        <Button
          variant="ghost"
          size="sm"
          aria-label="About tax ID"
          className="size-8 px-0"
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
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </Button>
      </Tooltip>
    </div>
  );
}
