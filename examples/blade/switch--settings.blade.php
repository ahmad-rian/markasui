<div class="divide-y divide-line rounded-lg border border-line bg-surface">
    <div class="flex items-start justify-between gap-4 p-4">
        <div class="grid gap-0.5">
            <p class="text-sm font-medium text-ink">Push notifications</p>
            <p class="text-sm text-muted">Alerts on your phone for new messages.</p>
        </div>
        <x-markas.switch name="push" aria-label="Push notifications" checked />
    </div>
    <div class="flex items-start justify-between gap-4 p-4">
        <div class="grid gap-0.5">
            <p class="text-sm font-medium text-ink">Weekly digest</p>
            <p class="text-sm text-muted">A summary of activity every Monday.</p>
        </div>
        <x-markas.switch name="digest" aria-label="Weekly digest" checked />
    </div>
    <div class="flex items-start justify-between gap-4 p-4">
        <div class="grid gap-0.5">
            <p class="text-sm font-medium text-ink">Product news</p>
            <p class="text-sm text-muted">Occasional emails about new features.</p>
        </div>
        <x-markas.switch name="news" aria-label="Product news" />
    </div>
</div>
