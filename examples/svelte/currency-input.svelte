<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import CurrencyInput from "../../components/currency-input/CurrencyInput.svelte";

  const panel = "grid gap-4 rounded-xl border border-line bg-surface p-5";
  const balance = "flex items-baseline justify-between";
  const balanceLabel = "text-sm text-muted";
  const balanceValue = "text-lg font-semibold text-ink tabular-nums";
</script>

<div class={panel}>
  <div class={balance}>
    <span class={balanceLabel}>Current balance</span>
    <span class={balanceValue}>Rp 245.000</span>
  </div>
  <CurrencyInput
    label="Top-up amount"
    name="amount"
    hint="Minimum Rp10.000, maximum Rp10.000.000"
    min={10000}
    max={10000000}
    defaultValue={100000}
    presets={[50000, 100000, 250000, 500000, 1000000]}
  />
  <Button>Top up balance</Button>
</div>
