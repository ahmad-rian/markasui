<script lang="ts">
  import Textarea from "../../components/textarea/Textarea.svelte";
</script>

<div class="grid gap-4">
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
    value="12 Main Street"
    error="Address is incomplete."
  />
</div>
