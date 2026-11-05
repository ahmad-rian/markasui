import { Button } from "../../components/button/Button";

export default function ButtonStatesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button disabled aria-busy="true">
        <svg
          className="size-4 animate-spin motion-reduce:animate-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.2-8.56" />
        </svg>
        Saving
      </Button>
    </div>
  );
}
