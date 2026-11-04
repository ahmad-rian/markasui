import { Textarea } from "../../components/textarea/Textarea";

export default function TextareaFixture() {
  return (
    <div className="grid gap-4">
      <Textarea
        name="bio"
        label="Short bio"
        placeholder="Tell us a little about yourself"
        hint="Up to 200 characters."
      />
      <Textarea
        name="address"
        label="Address"
        rows={2}
        defaultValue="12 Main Street"
        error="Address is incomplete."
      />
    </div>
  );
}
