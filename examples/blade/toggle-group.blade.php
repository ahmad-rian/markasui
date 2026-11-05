<div class="flex justify-center">
    <x-markas.toggle-group
        label="Calendar view"
        value="week"
        :items="[
            ['value' => 'day', 'label' => 'Day'],
            ['value' => 'week', 'label' => 'Week'],
            ['value' => 'month', 'label' => 'Month'],
        ]"
    />
</div>
