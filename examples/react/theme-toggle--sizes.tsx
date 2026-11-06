import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

export default function ThemeToggleSizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <ThemeToggle size="sm" variant="ghost" />
        <ThemeToggle size="md" variant="ghost" />
        <ThemeToggle size="lg" variant="ghost" />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle size="sm" variant="outline" animation="morph" />
        <ThemeToggle size="md" variant="outline" animation="morph" />
        <ThemeToggle size="lg" variant="outline" animation="morph" />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle size="sm" variant="solid" animation="flip" />
        <ThemeToggle size="md" variant="solid" animation="flip" />
        <ThemeToggle size="lg" variant="solid" animation="flip" />
      </div>
    </div>
  );
}
