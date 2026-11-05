<div class="grid gap-4">
    <div class="relative">
        <x-markas.input name="price" label="Price" placeholder="0.00" inputmode="decimal" class="pr-14! pl-7!" />
        <span class="pointer-events-none absolute bottom-0 left-3 flex h-10 items-center text-sm text-muted" aria-hidden="true">$</span>
        <span class="pointer-events-none absolute right-3 bottom-0 flex h-10 items-center text-sm text-muted">USD</span>
    </div>
    <div class="relative">
        <x-markas.input name="website" label="Website" placeholder="example.com" class="pl-21!" />
        <span class="pointer-events-none absolute bottom-0 left-0 flex h-10 items-center border-r border-line px-3 text-sm text-muted">https://</span>
    </div>
    <div class="relative">
        <x-markas.input name="username" label="Username" value="budisantoso" class="pl-7!" />
        <span class="pointer-events-none absolute bottom-0 left-3 flex h-10 items-center text-sm text-muted" aria-hidden="true">@</span>
    </div>
</div>
