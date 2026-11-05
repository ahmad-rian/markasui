<ul class="grid gap-1 rounded-lg border border-line bg-surface p-2 text-sm text-ink">
    <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Inbox</span>
        <x-markas.badge variant="primary" :dot="false" class="tabular-nums">12</x-markas.badge>
    </li>
    <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Mentions</span>
        <x-markas.badge :dot="false" class="tabular-nums">3</x-markas.badge>
    </li>
    <li class="flex items-center justify-between rounded-md px-3 py-2">
        <span>Failed jobs</span>
        <x-markas.badge variant="danger" :dot="false" class="tabular-nums">99+</x-markas.badge>
    </li>
</ul>
