<x-markas.navbar :links="[
    ['label' => 'Inbox', 'href' => '/inbox', 'active' => true],
    ['label' => 'Calendar', 'href' => '/calendar'],
    ['label' => 'Files', 'href' => '/files'],
]">
    <x-slot:brand>
        <x-markas.drawer side="left" title="Workspace">
            <x-slot:trigger>
                <x-markas.button variant="ghost" aria-label="Open sidebar" class="-ml-2 size-9 px-0">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M9 4v16" /></svg>
                </x-markas.button>
            </x-slot:trigger>
            <nav aria-label="Workspace" class="grid gap-1">
                @foreach ([['Inbox', '/inbox'], ['Calendar', '/calendar'], ['Files', '/files'], ['Settings', '/settings']] as [$label, $href])
                    <a href="{{ $href }}" class="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-subtle">{{ $label }}</a>
                @endforeach
            </nav>
        </x-markas.drawer>
        <span>Acme Mail</span>
    </x-slot:brand>
</x-markas.navbar>
