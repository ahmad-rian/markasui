import { Button } from "../../components/button/Button";
import { Tooltip } from "../../components/tooltip/Tooltip";

export default function TooltipIconButtonsExample() {
  return (
    <div className="flex justify-center py-10">
      <div className="flex items-center gap-1 rounded-lg border border-line bg-surface p-1">
        <Tooltip content="Bold (Ctrl+B)">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Bold"
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
              <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" />
            </svg>
          </Button>
        </Tooltip>
        <Tooltip content="Italic (Ctrl+I)">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Italic"
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
              <path d="M19 4h-9M14 20H5M15 4 9 20" />
            </svg>
          </Button>
        </Tooltip>
        <Tooltip content="Insert link (Ctrl+K)">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Insert link"
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
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
