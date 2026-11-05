<x-markas.accordion :items="['pro' => 'What is included in the Pro plan?', 'upgrade' => 'How do I upgrade?']" default-value="pro">
    <x-slot:pro>
        <div class="grid gap-3">
            <ul class="grid list-disc gap-1 pl-5">
                <li>Up to 10 team members</li>
                <li>50 GB of storage</li>
                <li>Priority email support</li>
            </ul>
            <div>
                <x-markas.button variant="secondary" size="sm">Compare plans</x-markas.button>
            </div>
        </div>
    </x-slot:pro>
    <x-slot:upgrade>Open the billing page and choose a new plan.</x-slot:upgrade>
</x-markas.accordion>
