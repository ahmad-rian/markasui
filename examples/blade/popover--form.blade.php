<div class="flex justify-center">
    <x-markas.popover label="Dimensions" align="center">
        <form class="grid gap-3">
            <p class="font-medium text-ink">Image size</p>
            <div class="grid grid-cols-2 gap-3">
                <x-markas.input name="width" label="Width" placeholder="1200" inputmode="numeric" />
                <x-markas.input name="height" label="Height" placeholder="630" inputmode="numeric" />
            </div>
            <x-markas.button type="submit" size="sm">Apply</x-markas.button>
        </form>
    </x-markas.popover>
</div>
