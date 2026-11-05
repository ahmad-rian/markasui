@php
    $card = 'grid h-full justify-items-center gap-3 p-6 text-center';
    $avatar = 'inline-flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-on-primary';
    $name = 'text-base font-semibold text-ink';
    $role = 'text-sm text-muted';
    $tags = 'flex flex-wrap justify-center gap-1.5';
    $tag = 'rounded-full bg-subtle px-2.5 py-0.5 text-xs text-ink';

    $people = [
        ['name' => 'Rina Kusuma', 'initials' => 'RK', 'role' => 'Product designer in Jakarta', 'skills' => ['Figma', 'Design systems', 'Research']],
        ['name' => 'Liam Carter', 'initials' => 'LC', 'role' => 'Frontend engineer in Toronto', 'skills' => ['React', 'Accessibility', 'Testing']],
        ['name' => 'Ayu Lestari', 'initials' => 'AL', 'role' => 'Data analyst in Bandung', 'skills' => ['SQL', 'Python', 'Dashboards']],
    ];
@endphp

<x-markas.card-stack label="Suggested teammates" prev-label="Previous person" next-label="Next person" class="mx-auto max-w-xs">
    @foreach ($people as $index => $person)
        <x-slot :name="'person-'.$index">
            <div class="{{ $card }}">
                <span aria-hidden="true" class="{{ $avatar }}">{{ $person['initials'] }}</span>
                <div>
                    <p class="{{ $name }}">{{ $person['name'] }}</p>
                    <p class="{{ $role }}">{{ $person['role'] }}</p>
                </div>
                <ul class="{{ $tags }}">
                    @foreach ($person['skills'] as $skill)
                        <li class="{{ $tag }}">{{ $skill }}</li>
                    @endforeach
                </ul>
            </div>
        </x-slot>
    @endforeach
</x-markas.card-stack>
