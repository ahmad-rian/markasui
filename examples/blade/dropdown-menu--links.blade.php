<div class="flex justify-center">
    <x-markas.dropdown-menu
        label="Account"
        :items="[
            ['label' => 'Profile', 'href' => '#profile'],
            ['label' => 'Billing', 'href' => '#billing'],
            ['label' => 'Settings', 'href' => '#settings'],
            ['separator' => true],
            ['label' => 'Sign out', 'value' => 'sign-out'],
        ]"
    />
</div>
