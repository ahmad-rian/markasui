<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Toaster, { toast } from "../../components/toast/Toast.svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button variant="secondary" onclick={() => toast({ title: "Link copied" })}
    >Default</Button
  >
  <Button
    variant="secondary"
    onclick={() => toast({ title: "Invitation sent", variant: "success" })}
    >Success</Button
  >
  <Button
    variant="secondary"
    onclick={() => toast({ title: "Upload failed", variant: "danger" })}
    >Danger</Button
  >
</div>
<Toaster />
