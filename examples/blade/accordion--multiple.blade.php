<x-markas.accordion :items="['account' => 'Account', 'billing' => 'Billing', 'security' => 'Security']" type="multiple" :default-value="['account', 'billing']">
    <x-slot:account>Update your name, email, and profile photo.</x-slot:account>
    <x-slot:billing>Manage your plan, payment method, and invoices.</x-slot:billing>
    <x-slot:security>Turn on two-step verification and review active sessions.</x-slot:security>
</x-markas.accordion>
