<script lang="ts">
  import Label from "../../components/label/Label.svelte";

  const row = "flex items-center gap-2 font-normal";
  const radio = "size-4 accent-primary";
</script>

<fieldset class="min-w-0">
  <legend class="mb-3 text-sm font-medium text-ink">Delivery speed</legend>
  <div class="grid gap-3">
    <Label class={row}>
      <input type="radio" name="speed" value="standard" checked class={radio} />
      Standard, 3 to 5 days
    </Label>
    <Label class={row}>
      <input type="radio" name="speed" value="express" class={radio} />
      Express, next business day
    </Label>
    <Label class={row}>
      <input type="radio" name="speed" value="pickup" class={radio} />
      Pick up in store
    </Label>
  </div>
</fieldset>
