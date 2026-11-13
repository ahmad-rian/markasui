<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Combobox from "../../components/combobox/Combobox.svelte";
  import Input from "../../components/input/Input.svelte";

  const cities = [
    { value: "bandung", label: "Bandung" },
    { value: "jakarta", label: "Jakarta" },
    { value: "kuala-lumpur", label: "Kuala Lumpur" },
    { value: "singapore", label: "Singapore" },
    { value: "surabaya", label: "Surabaya" },
  ];
</script>

<form class="grid gap-4 rounded-lg border border-line bg-surface p-6">
  <div class="grid gap-1">
    <p class="text-base font-semibold text-ink">Shipping address</p>
    <p class="text-sm text-muted">
      We deliver to most cities in Southeast Asia.
    </p>
  </div>
  <Input name="street" label="Street address" autocomplete="street-address" />
  <div class="grid grid-cols-2 gap-4">
    <Combobox
      name="city"
      label="City"
      placeholder="Search cities"
      options={cities}
    />
    <Input name="postal_code" label="Postal code" autocomplete="postal-code" />
  </div>
  <Button type="submit" class="w-full">Save address</Button>
</form>
