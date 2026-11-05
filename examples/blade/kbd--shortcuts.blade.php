<dl class="divide-y divide-line rounded-xl border border-line bg-surface text-sm text-ink">
    <div class="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Search</dt>
        <dd><x-markas.kbd :keys="['Ctrl', 'K']" /></dd>
    </div>
    <div class="flex items-center justify-between gap-4 px-4 py-3">
        <dt>New document</dt>
        <dd><x-markas.kbd :keys="['Ctrl', 'Alt', 'N']" /></dd>
    </div>
    <div class="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Go to next page</dt>
        <dd><x-markas.kbd :keys="['G', 'N']" separator="then" /></dd>
    </div>
    <div class="flex items-center justify-between gap-4 px-4 py-3">
        <dt>Show shortcuts</dt>
        <dd><x-markas.kbd>?</x-markas.kbd></dd>
    </div>
</dl>
