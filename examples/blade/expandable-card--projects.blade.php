@php
    $grid = 'grid grid-cols-2 gap-3';
    $chart = 'flex h-full items-end justify-center gap-2 bg-subtle px-4 pt-10 pb-4';
    $bar = 'w-4 rounded-sm bg-primary/70';
    $stats = 'grid grid-cols-2 gap-2 text-muted';
    $stat = 'block text-base font-semibold text-ink';

    $projects = [
        ['name' => 'Mobile app redesign', 'summary' => 'New navigation and onboarding for iOS and Android.', 'status' => 'On track', 'variant' => 'success', 'bars' => ['h-1/3', 'h-1/2', 'h-2/3', 'h-3/4', 'h-5/6'], 'tasks' => '42 of 58', 'due' => 'Dec 12'],
        ['name' => 'Billing migration', 'summary' => 'Move every workspace to the new invoicing provider.', 'status' => 'At risk', 'variant' => 'warning', 'bars' => ['h-1/2', 'h-1/3', 'h-1/2', 'h-1/4', 'h-1/3'], 'tasks' => '17 of 40', 'due' => 'Nov 28'],
    ];
@endphp

<div class="{{ $grid }}">
    @foreach ($projects as $project)
        <x-markas.expandable-card :title="$project['name']" :description="$project['summary']" close-label="Close project">
            <x-slot:media>
                <span class="{{ $chart }}">
                    @foreach ($project['bars'] as $height)
                        <span class="{{ $bar }} {{ $height }}"></span>
                    @endforeach
                </span>
            </x-slot:media>
            <div>
                <x-markas.badge :variant="$project['variant']">{{ $project['status'] }}</x-markas.badge>
            </div>
            <div class="{{ $stats }}">
                <p><span class="{{ $stat }}">{{ $project['tasks'] }}</span>tasks done</p>
                <p><span class="{{ $stat }}">{{ $project['due'] }}</span>due date</p>
            </div>
            <x-slot:footer>
                <x-markas.button variant="secondary">Share</x-markas.button>
                <x-markas.button>Open board</x-markas.button>
            </x-slot:footer>
        </x-markas.expandable-card>
    @endforeach
</div>
