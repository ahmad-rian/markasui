<form class="grid gap-4 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Shipping address</p>
        <p class="text-sm text-muted">We deliver to most cities in Southeast Asia.</p>
    </div>
    <x-markas.input name="street" label="Street address" autocomplete="street-address" />
    <div class="grid grid-cols-2 gap-4">
        <x-markas.combobox
            name="city"
            label="City"
            placeholder="Search cities"
            :options="[
                ['value' => 'bandung', 'label' => 'Bandung'],
                ['value' => 'jakarta', 'label' => 'Jakarta'],
                ['value' => 'kuala-lumpur', 'label' => 'Kuala Lumpur'],
                ['value' => 'singapore', 'label' => 'Singapore'],
                ['value' => 'surabaya', 'label' => 'Surabaya'],
            ]"
        />
        <x-markas.input name="postal_code" label="Postal code" autocomplete="postal-code" />
    </div>
    <x-markas.button type="submit" class="w-full">Save address</x-markas.button>
</form>
