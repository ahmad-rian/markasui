import { Slider } from "../../components/slider/Slider";

export default function SliderIconsExample() {
  return (
    <div className="flex items-center gap-3 text-muted">
      <svg
        className="size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H3v6h3l5 4z" />
      </svg>
      <div className="flex-1">
        <Slider
          name="volume"
          aria-label="Volume"
          defaultValue={45}
          showValue={false}
        />
      </div>
      <svg
        className="size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H3v6h3l5 4zm4.5 3.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
      </svg>
    </div>
  );
}
