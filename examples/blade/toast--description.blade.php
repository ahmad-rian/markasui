<div class="flex flex-wrap items-center gap-3" x-data>
    <x-markas.button variant="secondary" x-on:click="$dispatch('markas-toast', { title: 'Settings updated' })">Title only</x-markas.button>
    <x-markas.button x-on:click="$dispatch('markas-toast', { title: 'Payment failed', description: 'Your card was declined. Try another payment method.', variant: 'danger' })">With description</x-markas.button>
</div>
<x-markas.toast />
