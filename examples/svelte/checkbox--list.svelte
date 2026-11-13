<script lang="ts">
  import Checkbox from "../../components/checkbox/Checkbox.svelte";
</script>

<fieldset class="min-w-0">
  <legend class="mb-3 text-sm font-medium text-ink">Email me when</legend>
  <div class="grid gap-4">
    <Checkbox
      name="comments"
      label="Someone comments"
      description="Replies to your posts and threads you follow."
      checked
    />
    <Checkbox
      name="mentions"
      label="Someone mentions me"
      description="Any message that includes your username."
      checked
    />
    <Checkbox
      name="invites"
      label="I am invited to a project"
      description="Includes invitations from outside your workspace."
    />
  </div>
</fieldset>
