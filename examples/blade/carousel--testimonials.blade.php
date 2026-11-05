@php
    $quotes = [
        ['text' => 'We moved our whole team over in a weekend. Planning meetings are half as long now.', 'name' => 'Dewi Lestari', 'role' => 'Head of Product, Lumen'],
        ['text' => 'The weekly dashboard replaced three spreadsheets and a lot of status pings.', 'name' => 'Budi Santoso', 'role' => 'Engineering Manager, Arka'],
        ['text' => 'Simple enough for new hires, flexible enough for our client projects.', 'name' => 'Siti Aminah', 'role' => 'Founder, Studio Rana'],
    ];
@endphp

<x-markas.carousel label="Customer stories" show-dots>
    @foreach ($quotes as $index => $quote)
        <x-slot :name="'quote-'.$index">
            <figure class="rounded-xl border border-line bg-surface p-6">
                <blockquote class="text-base text-ink">{{ $quote['text'] }}</blockquote>
                <figcaption class="mt-4 text-sm">
                    <span class="font-medium text-ink">{{ $quote['name'] }}</span>
                    <span class="block text-muted">{{ $quote['role'] }}</span>
                </figcaption>
            </figure>
        </x-slot>
    @endforeach
</x-markas.carousel>
