<div class="flex justify-center">
    <x-markas.dropdown-menu
        label="Edit"
        :items="[
            ['label' => 'Undo', 'value' => 'undo'],
            ['label' => 'Redo', 'value' => 'redo', 'disabled' => true],
            ['separator' => true],
            ['label' => 'Cut', 'value' => 'cut'],
            ['label' => 'Copy', 'value' => 'copy'],
            ['label' => 'Paste', 'value' => 'paste', 'disabled' => true],
        ]"
    />
</div>
