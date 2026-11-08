@php
    $card = 'grid h-full content-between gap-6 p-5';
    $quote = 'text-base text-ink';
    $person = 'flex items-center gap-3';
    $avatar = 'inline-flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-medium text-ink';
    $meta = 'grid';
    $name = 'text-sm font-medium text-ink';
    $role = 'text-sm text-muted';

    $testimonials = [
        ['quote' => 'We replaced three internal UI kits with MarkasUI. New hires ship their first screen in an afternoon.', 'name' => 'Maya Putri', 'initials' => 'MP', 'role' => 'Engineering lead, Jakarta'],
        ['quote' => 'Same class names in Blade and React, so our Laravel pages and the React app finally match.', 'name' => 'Daniel Reyes', 'initials' => 'DR', 'role' => 'Laravel developer, Surabaya'],
        ['quote' => 'Copy, paste, adjust the tokens. Setup took ten minutes and the docs answered the rest.', 'name' => 'Sari Wijaya', 'initials' => 'SW', 'role' => 'CTO, Bandung'],
        ['quote' => 'Finally a component library our designers and engineers both enjoy opening on Monday.', 'name' => 'Tom Becker', 'initials' => 'TB', 'role' => 'Design engineer, Berlin'],
    ];
@endphp

<x-markas.card-stack label="Customer testimonials">
    @foreach ($testimonials as $index => $item)
        <x-slot :name="'card-'.$index">
            <figure class="{{ $card }}">
                <blockquote class="{{ $quote }}">{{ $item['quote'] }}</blockquote>
                <figcaption class="{{ $person }}">
                    <span aria-hidden="true" class="{{ $avatar }}">{{ $item['initials'] }}</span>
                    <span class="{{ $meta }}">
                        <span class="{{ $name }}">{{ $item['name'] }}</span>
                        <span class="{{ $role }}">{{ $item['role'] }}</span>
                    </span>
                </figcaption>
            </figure>
        </x-slot>
    @endforeach
</x-markas.card-stack>
