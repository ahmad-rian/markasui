<x-markas.context-menu
    :items="[
        ['label' => 'Undo', 'value' => 'undo'],
        ['label' => 'Redo', 'value' => 'redo', 'disabled' => true],
        ['separator' => true],
        ['label' => 'Cut', 'value' => 'cut'],
        ['label' => 'Copy', 'value' => 'copy'],
        ['label' => 'Paste', 'value' => 'paste', 'disabled' => true],
    ]"
>
    <div class="grid gap-2 rounded-lg border border-line bg-surface p-4 text-sm text-ink">
        <p class="font-medium">Meeting notes</p>
        <p class="text-muted">Launch moves to Monday. Design review on Thursday, bring the updated mockups.</p>
    </div>
</x-markas.context-menu>
