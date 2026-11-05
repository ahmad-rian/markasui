<x-markas.command
    hotkey
    :items="[
        ['group' => 'Suggestions', 'label' => 'Calendar', 'value' => 'calendar'],
        ['group' => 'Suggestions', 'label' => 'Search emoji', 'value' => 'emoji'],
        ['group' => 'Suggestions', 'label' => 'Calculator', 'value' => 'calculator'],
        ['group' => 'Settings', 'label' => 'Profile', 'value' => 'profile', 'shortcut' => 'Ctrl+P'],
        ['group' => 'Settings', 'label' => 'Billing', 'value' => 'billing', 'shortcut' => 'Ctrl+B'],
        ['group' => 'Settings', 'label' => 'Settings', 'value' => 'settings', 'shortcut' => 'Ctrl+S'],
    ]"
>
    <x-slot:trigger>
        <x-markas.button variant="secondary">Open command palette</x-markas.button>
    </x-slot:trigger>
</x-markas.command>
