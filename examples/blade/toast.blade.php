<div class="flex flex-wrap items-center gap-3" x-data>
    <x-markas.button x-on:click="$dispatch('markas-toast', { title: 'Changes saved', description: 'Your profile has been updated', variant: 'success', duration: 0 })">Show toast</x-markas.button>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Draft saved automatically' })">Temporary toast</x-markas.button>
</div>
<x-markas.toast />
