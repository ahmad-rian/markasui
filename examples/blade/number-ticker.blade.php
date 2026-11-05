<dl class="grid grid-cols-3 gap-4">
    <div>
        <dt class="text-sm text-muted">Downloads</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
            <x-markas.number-ticker :value="12480" />
        </dd>
    </div>
    <div>
        <dt class="text-sm text-muted">Uptime</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
            <x-markas.number-ticker :value="99.9" :decimals="1" suffix="%" />
        </dd>
    </div>
    <div>
        <dt class="text-sm text-muted">Revenue</dt>
        <dd class="mt-1 text-2xl font-semibold text-ink">
            <x-markas.number-ticker :value="84200" prefix="$" />
        </dd>
    </div>
</dl>
