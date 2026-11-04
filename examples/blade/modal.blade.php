<x-markas.modal title="Hapus proyek?">
    <x-slot:trigger>
        <x-markas.button variant="danger">Hapus proyek</x-markas.button>
    </x-slot:trigger>

    Proyek dan semua datanya akan dihapus permanen.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="batal">Batal</x-markas.button>
        <x-markas.button variant="danger" type="submit" value="hapus">Ya, hapus</x-markas.button>
    </x-slot:footer>
</x-markas.modal>
