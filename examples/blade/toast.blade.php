<div class="flex flex-wrap items-center gap-3" x-data>
    <x-markas.button x-on:click="$dispatch('markas-toast', { title: 'Perubahan disimpan', description: 'Profil Anda sudah diperbarui.', variant: 'success', duration: 0 })">Tampilkan toast</x-markas.button>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Draf tersimpan otomatis' })">Toast sementara</x-markas.button>
</div>
<x-markas.toast />
