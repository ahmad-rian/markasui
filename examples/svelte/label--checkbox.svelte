<script lang="ts">
  import Label from "../../components/label/Label.svelte";

  const row = "flex items-center gap-2";
  const box = "size-4 accent-primary";
</script>

<div class="grid gap-3">
  <Label required class={row}>
    <input type="checkbox" name="terms" required class={box} />I accept the
    terms of service
  </Label>
  <Label optional class={row}>
    <input type="checkbox" name="newsletter" class={box} />
    Send me the monthly newsletter
  </Label>
</div>
