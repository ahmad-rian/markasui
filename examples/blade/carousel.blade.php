@php
    $card = 'flex h-40 flex-col justify-end rounded-xl bg-subtle p-5';
    $title = 'text-sm font-medium text-ink';
    $text = 'mt-1 text-sm text-muted';
@endphp

<x-markas.carousel label="Product tour" show-dots>
    <x-slot:plan>
        <div class="{{ $card }}">
            <p class="{{ $title }}">Plan your week</p>
            <p class="{{ $text }}">Drag tasks onto the calendar to block focus time.</p>
        </div>
    </x-slot:plan>
    <x-slot:share>
        <div class="{{ $card }}">
            <p class="{{ $title }}">Share with your team</p>
            <p class="{{ $text }}">Invite teammates and assign tasks in one click.</p>
        </div>
    </x-slot:share>
    <x-slot:track>
        <div class="{{ $card }}">
            <p class="{{ $title }}">Track progress</p>
            <p class="{{ $text }}">See what shipped this week on a single dashboard.</p>
        </div>
    </x-slot:track>
</x-markas.carousel>
