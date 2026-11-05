@php
    $messages = [
        'Hi, the invoice for October is ready.',
        'Thanks. Can you add the design hours too?',
        'Sure, I added 12 hours for the dashboard work.',
        'Perfect. Please send it to finance by Friday.',
        'Sent. They confirmed it this morning.',
        'Great, closing this thread then.',
    ];
@endphp

<div role="log" aria-label="Conversation" tabindex="0" class="relative h-52 overflow-y-auto rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
    <x-markas.scroll-progress target="parent" color="success" size="md" />
    <ul class="space-y-2 p-4">
        @foreach ($messages as $index => $message)
            <li class="{{ $index % 2 === 0 ? 'mr-12 rounded-lg bg-subtle px-3 py-2 text-sm text-ink' : 'ml-12 rounded-lg bg-primary px-3 py-2 text-sm text-on-primary' }}">
                {{ $message }}
            </li>
        @endforeach
    </ul>
</div>
