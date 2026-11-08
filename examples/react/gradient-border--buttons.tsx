import { GradientBorder } from "../../components/gradient-border/GradientBorder";

export default function GradientBorderButtonsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <GradientBorder variant="shine" radius="full" className="inline-block">
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Get early access
        </button>
      </GradientBorder>
      <GradientBorder
        variant="shine"
        radius="lg"
        color="success"
        speed="slow"
        className="inline-block"
      >
        <button
          type="button"
          className="inline-flex h-10 items-center rounded-[7px] px-5 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Deploy preview
        </button>
      </GradientBorder>
    </div>
  );
}
