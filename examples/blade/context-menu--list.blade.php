@php
    $rows = [['name' => 'Website redesign', 'status' => 'In progress'], ['name' => 'Mobile app', 'status' => 'Planned']];
@endphp
<ul class="grid gap-2">
    @foreach ($rows as $row)
        <li>
            <x-markas.context-menu
                :aria-label="$row['name']"
                :items="[
                    ['label' => 'Open project', 'value' => 'open'],
                    ['label' => 'Copy link', 'value' => 'copy-link'],
                    ['separator' => true],
                    ['label' => 'Archive', 'value' => 'archive', 'danger' => true],
                ]"
            >
                <div class="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm">
                    <span class="font-medium text-ink">{{ $row['name'] }}</span>
                    <span class="text-muted">{{ $row['status'] }}</span>
                </div>
            </x-markas.context-menu>
        </li>
    @endforeach
</ul>
