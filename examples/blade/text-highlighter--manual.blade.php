<div x-data class="grid gap-4">
    <p class="text-base leading-7 text-muted">Before you publish, check that the <x-markas.text-highlighter trigger="manual">title fits in 60 characters</x-markas.text-highlighter>, every image has <x-markas.text-highlighter trigger="manual" color="success" :delay="250">alt text</x-markas.text-highlighter>, and the summary answers <x-markas.text-highlighter trigger="manual" color="danger" :delay="500">one clear question</x-markas.text-highlighter>.</p>
    <div class="flex gap-2">
        <button type="button" class="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" x-on:click="$dispatch('markas-highlight')">Highlight</button>
        <button type="button" class="inline-flex h-9 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" x-on:click="$dispatch('markas-highlight-reset')">Reset</button>
    </div>
</div>
