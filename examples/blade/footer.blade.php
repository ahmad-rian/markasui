<x-markas.footer copyright="© 2026 PT Rapi Teknologi Indonesia"
    description="Invoicing, payroll, and tax reports for Indonesian small businesses, in one tidy dashboard."
    :back-to-top="true"
    :columns="[
        ['title' => 'Product', 'links' => [
            ['label' => 'Invoicing', 'href' => '/invoicing'],
            ['label' => 'Payroll', 'href' => '/payroll'],
            ['label' => 'Expenses', 'href' => '/expenses'],
            ['label' => 'Integrations', 'href' => '/integrations'],
        ]],
        ['title' => 'Company', 'links' => [
            ['label' => 'About', 'href' => '/about'],
            ['label' => 'Careers', 'href' => '/careers'],
            ['label' => 'Press', 'href' => '/press'],
            ['label' => 'Contact', 'href' => '/contact'],
        ]],
        ['title' => 'Resources', 'links' => [
            ['label' => 'Docs', 'href' => '/docs'],
            ['label' => 'API reference', 'href' => '/api-reference'],
            ['label' => 'Changelog', 'href' => '/changelog'],
            ['label' => 'Status', 'href' => '/status'],
        ]],
    ]"
    :socials="[
        ['label' => 'X', 'href' => 'https://x.com/rapi', 'icon' => 'M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4'],
        ['label' => 'Instagram', 'href' => 'https://instagram.com/rapi', 'icon' => 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01'],
        ['label' => 'LinkedIn', 'href' => 'https://linkedin.com/rapi', 'icon' => 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z'],
        ['label' => 'YouTube', 'href' => 'https://youtube.com/rapi', 'icon' => 'M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17M10 15l5-3-5-3z'],
    ]"
    :legal="[
        ['label' => 'Privacy', 'href' => '/privacy'],
        ['label' => 'Terms', 'href' => '/terms'],
        ['label' => 'Cookies', 'href' => '/cookies'],
    ]">
    <x-slot:brand><svg class="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 20V4h7a5 5 0 0 1 0 10H6m7 0 5 6" /></svg>Rapi</x-slot:brand>
</x-markas.footer>
