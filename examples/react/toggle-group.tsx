import { ToggleGroup } from "../../components/toggle-group/ToggleGroup";

export default function ToggleGroupFixture() {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        label="Calendar view"
        defaultValue="week"
        items={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
        ]}
      />
    </div>
  );
}
