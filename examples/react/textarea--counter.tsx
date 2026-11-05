import { Textarea } from "../../components/textarea/Textarea";

export default function TextareaCounterExample() {
  return (
    <div className="grid gap-1.5">
      <Textarea
        name="summary"
        label="Summary"
        rows={3}
        maxLength={200}
        defaultValue="Weekly sync moves to Thursday at 10:00. Please review the roadmap draft before the meeting."
      />
      <div className="flex justify-between gap-4 text-sm text-muted">
        <p>Visible to everyone in the project.</p>
        <p>91 / 200</p>
      </div>
    </div>
  );
}
