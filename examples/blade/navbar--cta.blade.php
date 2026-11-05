<x-markas.navbar :links="[
    ['label' => 'Features', 'href' => '/features'],
    ['label' => 'Pricing', 'href' => '/pricing'],
    ['label' => 'Docs', 'href' => '/docs'],
]">
    <x-slot:brand>Acme</x-slot:brand>
    <x-slot:actions>
        <x-markas.button variant="ghost" size="sm">Log in</x-markas.button>
        <x-markas.button size="sm">Get started</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
