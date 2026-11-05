@php
    $list = 'grid gap-3';
    $meta = 'text-muted';

    $articles = [
        ['title' => 'Designing calm notifications', 'summary' => 'Why fewer, smarter alerts keep people focused, and how we cut ours by half without losing anything important.', 'body' => 'We grouped alerts by urgency, moved low-priority updates into a daily digest, and let people snooze whole projects.', 'meta' => '6 min read · Product'],
        ['title' => 'A field guide to empty states', 'summary' => 'Empty screens are the first thing new users see. Here are five patterns that turn them into a helpful start.', 'body' => 'Show a preview of what the screen will look like, offer one clear action, and never blame the user for having no data yet.', 'meta' => '4 min read · Design'],
        ['title' => 'Shipping faster with smaller pull requests', 'summary' => 'Our median review time dropped from two days to four hours after we capped pull requests at 300 lines.', 'body' => 'Small changes are easier to review, easier to revert, and keep the main branch moving every day.', 'meta' => '8 min read · Engineering'],
    ];
@endphp

<div class="{{ $list }}">
    @foreach ($articles as $article)
        <x-markas.expandable-card :title="$article['title']" :description="$article['summary']">
            <p>{{ $article['body'] }}</p>
            <p class="{{ $meta }}">{{ $article['meta'] }}</p>
            <x-slot:footer>
                <x-markas.button variant="secondary">Read full article</x-markas.button>
            </x-slot:footer>
        </x-markas.expandable-card>
    @endforeach
</div>
