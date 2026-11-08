@php
    $quotes = [
        ['text' => 'We moved our admin panel to MarkasUI in a weekend. Design reviews are half as long now.', 'name' => 'Dewi Lestari', 'role' => 'Head of Product, Jakarta'],
        ['text' => 'One set of tokens for Blade and Vue replaced three style guides and a lot of pixel nudging.', 'name' => 'Budi Santoso', 'role' => 'Engineering Manager, Bandung'],
        ['text' => 'Simple enough for client handoffs, flexible enough for every brand I work with.', 'name' => 'Siti Aminah', 'role' => 'Freelance developer, Yogyakarta'],
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
