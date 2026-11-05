@php
    $items = [
        ['value' => 'unpaid', 'label' => 'Unpaid over Rp 5.000.000', 'description' => 'Invoices, 6 results'],
        ['value' => 'churn', 'label' => 'Churned this month', 'description' => 'Customers, 18 results'],
        ['value' => 'trial', 'label' => 'Trials ending this week', 'description' => 'Customers, 42 results'],
    ];
@endphp

<div class="grid gap-4 rounded-xl border border-line bg-surface p-4">
    <p class="px-1 text-base font-semibold text-ink">Quick filters</p>
    <x-markas.pinned-list :items="$items" :default-pinned="['trial']" pinned-label="Favorites" all-label="Saved searches" />
</div>
