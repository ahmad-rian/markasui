import { ToggleGroup } from "../../components/toggle-group/ToggleGroup";

export default function ToggleGroupMultipleExample() {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="multiple"
        label="Text style"
        defaultValue={["bold", "underline"]}
        items={[
          {
            value: "bold",
            label: (
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
            ),
            ariaLabel: "Bold",
          },
          {
            value: "italic",
            label: (
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
            ),
            ariaLabel: "Italic",
          },
          {
            value: "underline",
            label: (
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
            ),
            ariaLabel: "Underline",
          },
        ]}
      />
    </div>
  );
}
