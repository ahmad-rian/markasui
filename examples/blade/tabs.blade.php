<x-markas.tabs :items="['account' => 'Account', 'password' => 'Password', 'notifications' => 'Notifications']" default-value="account">
    <x-slot:account>Change your account name and email.</x-slot:account>
    <x-slot:password>Change your password regularly.</x-slot:password>
    <x-slot:notifications>Choose which emails you want to receive.</x-slot:notifications>
</x-markas.tabs>
