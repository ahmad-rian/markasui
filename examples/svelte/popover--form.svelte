<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Input from "../../components/input/Input.svelte";
  import Popover from "../../components/popover/Popover.svelte";
</script>

<div class="flex justify-center">
  <Popover label="Dimensions" align="center">
    <form class="grid gap-3">
      <p class="font-medium text-ink">Image size</p>
      <div class="grid grid-cols-2 gap-3">
        <Input
          name="width"
          label="Width"
          placeholder="1200"
          inputmode="numeric"
        />
        <Input
          name="height"
          label="Height"
          placeholder="630"
          inputmode="numeric"
        />
      </div>
      <Button type="submit" size="sm">Apply</Button>
    </form>
  </Popover>
</div>
