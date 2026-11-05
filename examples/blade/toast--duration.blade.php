<div class="flex flex-wrap items-center gap-3" x-data>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Message archived', duration: 3000 })">Short (3s)</x-markas.button>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Report is ready', description: 'Download it from the exports page.' })">Default (5s)</x-markas.button>
    <x-markas.button x-on:click="$dispatch('markas-toast', { title: 'New version available', description: 'Reload the page to update.', duration: 0 })">Stay open</x-markas.button>
</div>
<x-markas.toast />
