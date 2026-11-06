import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

export default function ThemeToggleWithLabelExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ThemeToggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="outline"
      />
      <ThemeToggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="solid"
        animation="morph"
        size="sm"
      />
      <ThemeToggle
        showText
        darkLabel="Dark mode"
        lightLabel="Light mode"
        variant="ghost"
        animation="slide"
        size="lg"
      />
    </div>
  );
}
