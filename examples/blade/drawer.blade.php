<x-markas.drawer title="Filter products">
    <x-slot:trigger>
        <x-markas.button variant="secondary">Open filters</x-markas.button>
    </x-slot:trigger>

    Choose a category and price range to filter the product list.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
        <x-markas.button type="submit" value="apply">Apply</x-markas.button>
    </x-slot:footer>
</x-markas.drawer>
