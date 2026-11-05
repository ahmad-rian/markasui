<x-markas.accordion :items="['order' => 'Order summary', 'shipping' => 'Shipping address', 'payment' => 'Payment method']" default-value="order" class="rounded-xl border bg-surface px-4">
    <x-slot:order>3 items, total $86.00 including tax.</x-slot:order>
    <x-slot:shipping>Jl. Merdeka No. 12, Bandung, West Java 40111.</x-slot:shipping>
    <x-slot:payment>Visa ending in 4242, expires 08/28.</x-slot:payment>
</x-markas.accordion>
