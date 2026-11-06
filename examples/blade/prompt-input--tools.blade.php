@php
    $tool = 'inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary-line aria-pressed:bg-primary-soft aria-pressed:text-ink motion-reduce:transition-none';
    $icon = 'size-3.5';
    $tools = [
        ['label' => 'Search', 'icon' => 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4', 'on' => true],
        ['label' => 'Reason', 'icon' => 'M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6', 'on' => false],
    ];
@endphp

<x-markas.prompt-input placeholder-label="Ask about your sales, invoices, or stock">
    <x-slot:actions>
        @foreach ($tools as $item)
            <button
                type="button"
                x-data="{ on: @js($item['on']) }"
                aria-pressed="{{ $item['on'] ? 'true' : 'false' }}"
                x-bind:aria-pressed="on"
                x-on:click="on = ! on"
                class="{{ $tool }}"
            ><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="{{ $item['icon'] }}" /></svg>{{ $item['label'] }}</button>
        @endforeach
    </x-slot:actions>
</x-markas.prompt-input>
