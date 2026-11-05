<div class="grid gap-4">
    <div class="relative">
        <x-markas.select name="language" label="Language" class="pl-9!">
            <option value="en" selected>English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="ja">Japanese</option>
        </x-markas.select>
        <svg class="pointer-events-none absolute bottom-3 left-3 size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
    </div>
    <div class="relative">
        <x-markas.select name="currency" label="Currency" class="pl-9!">
            <option value="idr">IDR, Indonesian rupiah</option>
            <option value="usd" selected>USD, US dollar</option>
            <option value="eur">EUR, Euro</option>
        </x-markas.select>
        <svg class="pointer-events-none absolute bottom-3 left-3 size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
    </div>
</div>
