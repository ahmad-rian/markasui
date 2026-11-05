import { Combobox } from "../../components/combobox/Combobox";

const people = [
  { value: "ana", label: "Ana Putri" },
  { value: "budi", label: "Budi Santoso" },
  { value: "citra", label: "Citra Lestari" },
];

export default function ComboboxStatesExample() {
  return (
    <div className="grid gap-4">
      <Combobox
        name="assignee"
        label="Assignee"
        placeholder="Search people"
        hint="Only members of this project are listed."
        options={people}
      />
      <Combobox
        name="reviewer"
        label="Reviewer"
        placeholder="Search people"
        error="Choose a reviewer before submitting."
        options={people}
      />
      <Combobox
        name="owner"
        label="Owner"
        defaultValue="budi"
        disabled
        options={people}
      />
    </div>
  );
}
