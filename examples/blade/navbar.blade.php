<x-markas.navbar :links="[
    ['label' => 'Beranda', 'href' => '/', 'active' => true],
    ['label' => 'Komponen', 'href' => '/komponen'],
    ['label' => 'Dokumentasi', 'href' => '/dokumentasi'],
]">
    <x-slot:brand>MarkasUI</x-slot:brand>
    <x-slot:actions>
        <x-markas.button size="sm">Masuk</x-markas.button>
    </x-slot:actions>
</x-markas.navbar>
