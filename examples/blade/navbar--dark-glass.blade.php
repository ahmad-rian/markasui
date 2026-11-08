<div class="dark overflow-hidden rounded-2xl bg-canvas bg-[radial-gradient(70%_90%_at_20%_0%,color-mix(in_oklab,var(--color-success)_28%,transparent),transparent),radial-gradient(60%_80%_at_90%_10%,color-mix(in_oklab,var(--color-primary)_16%,transparent),transparent)] p-3 text-ink">
    <x-markas.navbar variant="blur" class="rounded-xl border" :links="[
        ['label' => 'Product', 'href' => '/product', 'active' => true],
        ['label' => 'Customers', 'href' => '/customers'],
        ['label' => 'Pricing', 'href' => '/pricing'],
    ]">
        <x-slot:brand>Acme</x-slot:brand>
        <x-slot:actions>
            <x-markas.button size="sm">Start free</x-markas.button>
        </x-slot:actions>
    </x-markas.navbar>
    <div class="grid gap-3 px-3 pt-12 pb-10">
        <h2 class="text-3xl font-semibold tracking-tight text-balance">Ship your next launch in days</h2>
        <p class="text-muted">A translucent header keeps the hero visible as it scrolls under.</p>
    </div>
</div>
