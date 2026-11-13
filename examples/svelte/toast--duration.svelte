<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Toaster, { toast } from "../../components/toast/Toast.svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button
    variant="secondary"
    onclick={() => toast({ title: "Message archived", duration: 3000 })}
    >Short (3s)</Button
  >
  <Button
    variant="secondary"
    onclick={() =>
      toast({
        title: "Report is ready",
        description: "Download it from the exports page.",
      })}>Default (5s)</Button
  >
  <Button
    onclick={() =>
      toast({
        title: "New version available",
        description: "Reload the page to update.",
        duration: 0,
      })}>Stay open</Button
  >
</div>
<Toaster />
