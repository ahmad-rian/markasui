<x-markas.footer variant="cta"
    heading="Close your books in minutes, not days"
    description="Join 12,000 Indonesian businesses that send invoices and run payroll with Rapi."
    copyright="© 2026 PT Rapi Teknologi Indonesia"
    :columns="[
        ['links' => [
            ['label' => 'Pricing', 'href' => '/pricing'],
            ['label' => 'Customers', 'href' => '/customers'],
            ['label' => 'Docs', 'href' => '/docs'],
            ['label' => 'Contact', 'href' => '/contact'],
        ]],
    ]"
    :socials="[
        ['label' => 'X', 'href' => 'https://x.com/rapi', 'icon' => 'M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4'],
        ['label' => 'LinkedIn', 'href' => 'https://linkedin.com/rapi', 'icon' => 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z'],
    ]"
    :legal="[
        ['label' => 'Privacy', 'href' => '/privacy'],
        ['label' => 'Terms', 'href' => '/terms'],
    ]">
    <x-slot:brand><svg class="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 20V4h7a5 5 0 0 1 0 10H6m7 0 5 6" /></svg>Rapi</x-slot:brand>
    <x-slot:actions>
        <x-markas.button>Start free trial</x-markas.button>
        <x-markas.button variant="secondary">Talk to sales</x-markas.button>
    </x-slot:actions>
</x-markas.footer>
