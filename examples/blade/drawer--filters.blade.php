<div class="flex justify-center">
    <x-markas.drawer title="Filter products">
        <x-slot:trigger>
            <x-markas.button variant="secondary">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18M6 12h12M10 19h4" /></svg>
                Filters
            </x-markas.button>
        </x-slot:trigger>

        <fieldset class="grid gap-3">
            <legend class="mb-3 font-medium text-ink">Category</legend>
            <x-markas.checkbox name="category-shoes" label="Shoes" />
            <x-markas.checkbox name="category-bags" label="Bags" />
            <x-markas.checkbox name="category-accessories" label="Accessories" />
        </fieldset>

        <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="reset">Reset</x-markas.button>
            <x-markas.button type="submit" value="apply">Show results</x-markas.button>
        </x-slot:footer>
    </x-markas.drawer>
</div>
