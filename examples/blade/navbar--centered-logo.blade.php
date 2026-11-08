{{-- From 42rem the bar becomes three columns: links left, logo centre, actions right. --}}
<x-markas.navbar class="@2xl:[&>div:first-child]:grid @2xl:[&>div:first-child]:grid-cols-[1fr_auto_1fr] @2xl:[&>div>nav]:order-first" :links="[
    ['label' => 'Products', 'href' => '/products', 'active' => true],
    ['label' => 'Pricing', 'href' => '/pricing'],
    ['label' => 'Docs', 'href' => '/docs'],
]">
    <x-slot:brand>
        <svg class="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-9 5 9 5 9-5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
        <span>Acme</span>
    </x-slot:brand>
    <x-slot:actions>
        <a href="/blog" class="hidden rounded-md px-3 text-sm font-medium text-muted hover:text-ink @2xl:inline">Blog</a>
        <a href="/login" class="hidden rounded-md px-3 text-sm font-medium text-muted hover:text-ink @2xl:inline">Sign in</a>
        <x-markas.button size="sm">Get started</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
