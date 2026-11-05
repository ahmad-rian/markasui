<form class="grid gap-6 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Digest emails</p>
        <p class="text-sm text-muted">A summary of activity in projects you follow.</p>
    </div>
    <x-markas.radio-group
        name="digest"
        label="Frequency"
        value="weekly"
        :options="[
            ['value' => 'daily', 'label' => 'Daily', 'description' => 'Every morning at 08:00.'],
            ['value' => 'weekly', 'label' => 'Weekly', 'description' => 'Every Monday morning.'],
            ['value' => 'never', 'label' => 'Never', 'description' => 'Only important account notices.'],
        ]"
    />
    <div class="flex justify-end gap-2">
        <x-markas.button variant="secondary">Cancel</x-markas.button>
        <x-markas.button type="submit">Save</x-markas.button>
    </div>
</form>
