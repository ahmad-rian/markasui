<div class="grid gap-3">
    <x-markas.table
        caption="Invoices"
        :columns="[
            ['key' => 'invoice', 'label' => 'Invoice'],
            ['key' => 'customer', 'label' => 'Customer'],
            ['key' => 'status', 'label' => 'Status'],
            ['key' => 'amount', 'label' => 'Amount', 'align' => 'right'],
        ]"
        :rows="[]"
    />
    <div class="grid justify-items-center gap-2 rounded-xl border border-dashed border-line px-6 py-8 text-center">
        <svg class="size-6 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 7v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7M4 7l2-3h12l2 3M9 12h6" /></svg>
        <p class="text-sm font-medium text-ink">No invoices yet</p>
        <p class="text-sm text-muted">Invoices you create will show up here.</p>
        <x-markas.button size="sm" class="mt-2">Create invoice</x-markas.button>
    </div>
</div>
