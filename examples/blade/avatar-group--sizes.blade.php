@php
    $team = [
        ['name' => 'Dewi Lestari'],
        ['name' => 'Budi Santoso'],
        ['name' => 'Siti Aminah'],
        ['name' => 'John Carter'],
        ['name' => 'Maya Putri'],
    ];
@endphp

<div class="flex flex-col gap-5 pt-8">
    <x-markas.avatar-group :items="$team" size="sm" :max="3" group-label="Small" />
    <x-markas.avatar-group :items="$team" :max="3" group-label="Medium" />
    <x-markas.avatar-group :items="$team" size="lg" :max="3" group-label="Large" />
</div>
