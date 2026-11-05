<div class="grid gap-6">
    <x-markas.radio-group
        name="theme"
        label="Theme"
        value="system"
        orientation="horizontal"
        :options="[
            ['value' => 'light', 'label' => 'Light'],
            ['value' => 'dark', 'label' => 'Dark'],
            ['value' => 'system', 'label' => 'System'],
        ]"
    />
    <x-markas.radio-group
        name="size"
        label="Size"
        value="m"
        orientation="horizontal"
        :options="[
            ['value' => 's', 'label' => 'Small'],
            ['value' => 'm', 'label' => 'Medium'],
            ['value' => 'l', 'label' => 'Large'],
            ['value' => 'xl', 'label' => 'Extra large'],
        ]"
    />
</div>
