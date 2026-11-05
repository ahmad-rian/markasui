@php
    $team = [
        ['name' => 'Dewi Lestari', 'src' => "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='rgb(46 107 58)'/%3E%3Ccircle cx='24' cy='19' r='8' fill='rgb(231 239 229)'/%3E%3Cpath d='M8 46c1-9 8-15 16-15s15 6 16 15z' fill='rgb(231 239 229)'/%3E%3C/svg%3E"],
        ['name' => 'Budi Santoso'],
        ['name' => 'Siti Aminah'],
        ['name' => 'John Carter'],
        ['name' => 'Maya Putri'],
        ['name' => 'Rizal Hakim'],
        ['name' => 'Ana Lim'],
    ];
@endphp

<div class="flex items-center gap-3 pt-8">
    <x-markas.avatar-group :items="$team" group-label="Project members" />
    <span class="text-sm text-muted">7 people on this project</span>
</div>
