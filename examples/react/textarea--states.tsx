import { Textarea } from "../../components/textarea/Textarea";

export default function TextareaStatesExample() {
  return (
    <div className="grid gap-4">
      <Textarea
        name="bio"
        label="Short bio"
        rows={3}
        placeholder="Tell us a little about yourself"
        hint="Shown on your public profile."
      />
      <Textarea
        name="reason"
        label="Reason for refund"
        rows={3}
        defaultValue="Wrong size"
        error="Please describe the issue in at least 20 characters."
      />
      <Textarea
        name="notes"
        label="Internal notes"
        rows={3}
        defaultValue="Customer upgraded to the Pro plan on 3 March."
        disabled
      />
    </div>
  );
}
