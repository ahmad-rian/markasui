@php
    $card = 'grid h-full content-between gap-4 p-5';
    $step = 'text-xs font-medium text-muted';
    $title = 'mt-1 text-base font-semibold text-ink';
    $text = 'mt-1 text-sm text-muted';
    $link = 'text-sm font-medium text-ink underline underline-offset-4 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

    $tips = [
        ['title' => 'Press K to search', 'text' => 'Jump to any page, project, or teammate without touching the mouse.'],
        ['title' => 'Drag to reorder', 'text' => 'Grab a task by its handle and drop it where it belongs.'],
        ['title' => 'Mention with @', 'text' => 'Type @ and a name to notify a teammate right inside a comment.'],
        ['title' => 'Star what matters', 'text' => 'Starred projects stay pinned at the top of your sidebar.'],
    ];
@endphp

<x-markas.card-stack label="Getting started tips" prev-label="Previous tip" next-label="Next tip" card-label="Tip {index} of {total}">
    @foreach ($tips as $index => $tip)
        <x-slot :name="'tip-'.$index">
            <div class="{{ $card }}">
                <div>
                    <p class="{{ $step }}">Tip {{ $index + 1 }}</p>
                    <p class="{{ $title }}">{{ $tip['title'] }}</p>
                    <p class="{{ $text }}">{{ $tip['text'] }}</p>
                </div>
                <a href="#shortcuts" class="{{ $link }}">See all shortcuts</a>
            </div>
        </x-slot>
    @endforeach
</x-markas.card-stack>
