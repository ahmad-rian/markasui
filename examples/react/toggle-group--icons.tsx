import { ToggleGroup } from "../../components/toggle-group/ToggleGroup";

export default function ToggleGroupIconsExample() {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        label="Text alignment"
        defaultValue="left"
        items={[
          {
            value: "left",
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
                <path d="M4 6h16M4 12h10M4 18h14" />
              </svg>
            ),
            ariaLabel: "Align left",
          },
          {
            value: "center",
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
                <path d="M4 6h16M7 12h10M5 18h14" />
              </svg>
            ),
            ariaLabel: "Align center",
          },
          {
            value: "right",
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
                <path d="M4 6h16M10 12h10M6 18h14" />
              </svg>
            ),
            ariaLabel: "Align right",
          },
        ]}
      />
    </div>
  );
}
