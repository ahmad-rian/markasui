<x-markas.tabs :items="['monthly' => 'Monthly', 'yearly' => 'Yearly']" default-value="monthly" class="[&_[role=tab]]:flex-1 [&_[role=tablist]]:flex">
    <x-slot:monthly>
        <div class="grid gap-1">
            <span class="text-2xl font-semibold text-ink">$12 per month</span>
            <span class="text-sm text-muted">Billed monthly. Cancel anytime.</span>
        </div>
    </x-slot:monthly>
    <x-slot:yearly>
        <div class="grid gap-1">
            <span class="text-2xl font-semibold text-ink">$120 per year</span>
            <span class="text-sm text-muted">Two months free compared to monthly billing.</span>
        </div>
    </x-slot:yearly>
</x-markas.tabs>
