<div class="grid gap-3">
    <x-markas.radio-group
        name="payout"
        label="Payout schedule"
        value="weekly"
        disabled
        :options="[
            ['value' => 'daily', 'label' => 'Daily'],
            ['value' => 'weekly', 'label' => 'Weekly'],
            ['value' => 'monthly', 'label' => 'Monthly'],
        ]"
    />
    <p class="text-sm text-muted">Verify your bank account to change the payout schedule.</p>
</div>
