<script lang="ts">
  import Textarea from "../../components/textarea/Textarea.svelte";
</script>

<div class="grid gap-4">
  <Textarea
    name="headline"
    label="Headline"
    rows={2}
    placeholder="One or two sentences"
  />
  <Textarea
    name="description"
    label="Description"
    rows={6}
    placeholder="Describe the change, why it matters, and how to test it"
  />
  <Textarea
    name="address"
    label="Shipping address"
    rows={3}
    placeholder="Street, city, postal code"
    class="resize-none"
  />
</div>
