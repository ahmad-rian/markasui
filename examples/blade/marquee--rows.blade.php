@php
    $chip = 'rounded-lg bg-subtle px-3 py-1.5 text-sm whitespace-nowrap text-ink';
@endphp

<div class="flex flex-col gap-3">
    <x-markas.marquee :duration="25">
        @foreach (['Accordion', 'Avatar', 'Badge', 'Button', 'Card', 'Carousel'] as $name)
            <span class="{{ $chip }}">{{ $name }}</span>
        @endforeach
    </x-markas.marquee>
    <x-markas.marquee :duration="25" reverse>
        @foreach (['Modal', 'Popover', 'Select', 'Slider', 'Tabs', 'Tooltip'] as $name)
            <span class="{{ $chip }}">{{ $name }}</span>
        @endforeach
    </x-markas.marquee>
</div>
