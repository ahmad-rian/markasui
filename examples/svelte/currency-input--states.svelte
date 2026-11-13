<script lang="ts">
  import CurrencyInput from "../../components/currency-input/CurrencyInput.svelte";

  const stack = "grid gap-5";
</script>

<div class={stack}>
  <CurrencyInput
    label="Transfer amount"
    error="Amount exceeds your daily limit of Rp5.000.000"
    defaultValue={7500000}
  />
  <CurrencyInput label="Admin fee" defaultValue={2500} disabled />
  <CurrencyInput label="Opening balance" placeholder="0" />
</div>
