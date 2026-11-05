import { ToggleGroup } from "../../components/toggle-group/ToggleGroup";

export default function ToggleGroupWithTextExample() {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        label="Layout"
        defaultValue="list"
        items={[
          {
            value: "list",
            label: (
              <>
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
                  <path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" />
                </svg>
                List
              </>
            ),
          },
          {
            value: "grid",
            label: (
              <>
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
                  <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
                </svg>
                Grid
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
