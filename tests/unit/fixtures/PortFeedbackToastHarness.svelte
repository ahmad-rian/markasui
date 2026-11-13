<script lang="ts">
  import Toaster, { toast } from "../../../components/toast/Toast.svelte";

  let { closeLabel = "Close" }: { closeLabel?: string } = $props();
</script>

<button
  type="button"
  onclick={() =>
    toast({
      title: "Saved",
      description: "Profile updated",
      variant: "success",
      duration: 0,
    })}>Show</button
>
<button type="button" onclick={() => toast({ title: "Draft", duration: 1000 })}
  >Temporary</button
>
<Toaster {closeLabel} class="bottom-8" />
