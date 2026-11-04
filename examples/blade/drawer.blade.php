<x-markas.drawer title="Filter produk">
    <x-slot:trigger>
        <x-markas.button variant="secondary">Buka filter</x-markas.button>
    </x-slot:trigger>

    Pilih kategori dan rentang harga untuk menyaring daftar produk.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="batal">Batal</x-markas.button>
        <x-markas.button type="submit" value="terapkan">Terapkan</x-markas.button>
    </x-slot:footer>
</x-markas.drawer>
