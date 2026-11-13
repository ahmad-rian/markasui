<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Toaster, { toast } from "../../components/toast/Toast.svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button
    onclick={() =>
      toast({
        title: "Changes saved",
        description: "Your profile has been updated",
        variant: "success",
        duration: 0,
      })}>Show toast</Button
  >
  <Button
    variant="secondary"
    onclick={() => toast({ title: "Draft saved automatically" })}
    >Temporary toast</Button
  >
</div>
<Toaster />
