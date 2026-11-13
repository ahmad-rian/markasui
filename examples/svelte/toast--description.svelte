<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Toaster, { toast } from "../../components/toast/Toast.svelte";
</script>

<div class="flex flex-wrap items-center gap-3">
  <Button
    variant="secondary"
    onclick={() => toast({ title: "Settings updated" })}>Title only</Button
  >
  <Button
    onclick={() =>
      toast({
        title: "Payment failed",
        description: "Your card was declined. Try another payment method.",
        variant: "danger",
      })}>With description</Button
  >
</div>
<Toaster />
