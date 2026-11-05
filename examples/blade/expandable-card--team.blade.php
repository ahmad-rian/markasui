@php
    $grid = 'grid grid-cols-3 gap-3';
    $portrait = 'flex h-full items-center justify-center bg-primary-soft';
    $avatar = 'inline-flex size-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-on-primary';
    $contact = 'text-muted';

    $team = [
        ['name' => 'Nadia Rahma', 'initials' => 'NR', 'role' => 'Engineering lead', 'bio' => 'Leads the platform team and loves a well-written postmortem.', 'email' => 'nadia@example.com'],
        ['name' => 'Owen Park', 'initials' => 'OP', 'role' => 'Product designer', 'bio' => 'Sketches every flow on paper before opening a design tool.', 'email' => 'owen@example.com'],
        ['name' => 'Putu Arya', 'initials' => 'PA', 'role' => 'Customer success', 'bio' => 'Turns tricky support tickets into product improvements.', 'email' => 'putu@example.com'],
    ];
@endphp

<div class="{{ $grid }}">
    @foreach ($team as $person)
        <x-markas.expandable-card :title="$person['name']" :description="$person['role']">
            <x-slot:media>
                <span class="{{ $portrait }}">
                    <span aria-hidden="true" class="{{ $avatar }}">{{ $person['initials'] }}</span>
                </span>
            </x-slot:media>
            <p>{{ $person['bio'] }}</p>
            <p class="{{ $contact }}">{{ $person['email'] }}</p>
            <x-slot:footer>
                <x-markas.button>Send message</x-markas.button>
            </x-slot:footer>
        </x-markas.expandable-card>
    @endforeach
</div>
