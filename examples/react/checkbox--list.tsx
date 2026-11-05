import { Checkbox } from "../../components/checkbox/Checkbox";

export default function CheckboxListExample() {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-medium text-ink">
        Email me when
      </legend>
      <div className="grid gap-4">
        <Checkbox
          name="comments"
          label="Someone comments"
          description="Replies to your posts and threads you follow."
          defaultChecked
        />
        <Checkbox
          name="mentions"
          label="Someone mentions me"
          description="Any message that includes your username."
          defaultChecked
        />
        <Checkbox
          name="invites"
          label="I am invited to a project"
          description="Includes invitations from outside your workspace."
        />
      </div>
    </fieldset>
  );
}
