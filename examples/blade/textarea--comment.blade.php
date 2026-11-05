<div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
    <x-markas.textarea name="comment" aria-label="Comment" :rows="3" placeholder="Leave a comment" />
    <div class="flex items-center justify-between gap-4">
        <p class="text-sm text-muted">Markdown is supported.</p>
        <div class="flex gap-2">
            <x-markas.button variant="ghost" size="sm">Cancel</x-markas.button>
            <x-markas.button size="sm">Comment</x-markas.button>
        </div>
    </div>
</div>
