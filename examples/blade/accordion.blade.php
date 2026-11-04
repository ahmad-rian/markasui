<x-markas.accordion :items="['shipping' => 'How long does shipping take?', 'payment' => 'Which payment methods are available?', 'returns' => 'How do I return an item?']" default-value="shipping">
    <x-slot:shipping>Orders arrive in 2 to 4 business days.</x-slot:shipping>
    <x-slot:payment>Bank transfer, credit card, and digital wallets.</x-slot:payment>
    <x-slot:returns>Request a return within 7 days from the order page.</x-slot:returns>
</x-markas.accordion>
