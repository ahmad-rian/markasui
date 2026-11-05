<x-markas.command
    :items="[
        ['group' => 'Documentation', 'label' => 'Getting started', 'href' => '#getting-started'],
        ['group' => 'Documentation', 'label' => 'Installation', 'href' => '#installation'],
        ['group' => 'Documentation', 'label' => 'Theming', 'href' => '#theming'],
        ['group' => 'Components', 'label' => 'Button', 'href' => '#button'],
        ['group' => 'Components', 'label' => 'Modal', 'href' => '#modal'],
    ]"
>
    <x-slot:trigger>
        <x-markas.button variant="ghost">Search documentation</x-markas.button>
    </x-slot:trigger>
</x-markas.command>
