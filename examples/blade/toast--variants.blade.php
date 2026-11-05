<div class="flex flex-wrap items-center gap-3" x-data>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Link copied' })">Default</x-markas.button>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Invitation sent', variant: 'success' })">Success</x-markas.button>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Upload failed', variant: 'danger' })">Danger</x-markas.button>
</div>
<x-markas.toast />
