<script lang="ts">
  import Textarea from "../../components/textarea/Textarea.svelte";
</script>

<div class="grid gap-4">
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
    value="Wrong size"
    error="Please describe the issue in at least 20 characters."
  />
  <Textarea
    name="notes"
    label="Internal notes"
    rows={3}
    value="Customer upgraded to the Pro plan on 3 March."
    disabled
  />
</div>
