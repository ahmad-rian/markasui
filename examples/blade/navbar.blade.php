<x-markas.navbar :links="[
    ['label' => 'Home', 'href' => '/', 'active' => true],
    ['label' => 'Components', 'href' => '/components'],
    ['label' => 'Docs', 'href' => '/docs'],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Sign in</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
