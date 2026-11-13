<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import CurrencyInput from "../../components/currency-input/CurrencyInput.svelte";

  const panel = "grid gap-4";
  const heading = "grid gap-1";
  const title = "text-base font-semibold text-ink";
  const text = "text-sm text-muted";
</script>

<div class={panel}>
  <div class={heading}>
    <p class={title}>Support the village library</p>
    <p class={text}>Every rupiah goes to new books for 300 students.</p>
  </div>
  <CurrencyInput
    label="Donation amount"
    name="donation"
    placeholder="0"
    min={5000}
    hint="Minimum Rp5.000"
    presets={[25000, 50000, 100000, 1500000]}
    presetsLabel="Suggested donations"
  />
  <Button variant="secondary">Continue to payment</Button>
</div>
