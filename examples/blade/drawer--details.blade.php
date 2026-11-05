<div class="flex justify-center">
    <x-markas.drawer title="Order #1042">
        <x-slot:trigger>
            <x-markas.button variant="secondary">View order</x-markas.button>
        </x-slot:trigger>

        <dl class="grid grid-cols-2 gap-y-3">
            <dt>Customer</dt>
            <dd class="text-ink">Rina Hartono</dd>
            <dt>Placed on</dt>
            <dd class="text-ink">12 Oct 2026</dd>
            <dt>Items</dt>
            <dd class="text-ink">3</dd>
            <dt>Total</dt>
            <dd class="font-medium text-ink">$128.00</dd>
        </dl>

        <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="close">Close</x-markas.button>
            <x-markas.button type="submit" value="ship">Mark as shipped</x-markas.button>
        </x-slot:footer>
    </x-markas.drawer>
</div>
