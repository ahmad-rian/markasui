@php
    $frame = 'relative aspect-[8/5] w-full overflow-hidden bg-linear-to-b from-warning/35 via-warning/10 to-success/20';
    $sun = 'absolute top-8 right-20 size-14 rounded-full bg-warning';
    $hills = 'absolute inset-x-0 bottom-0 h-3/5 w-full';
    $far = 'fill-success/50';
    $near = 'fill-success';
    $lake = 'fill-surface/50';

    // One deterministic landscape, toned flat (before) or vivid (after).
    $panels = ['before' => 'grayscale contrast-75', 'after' => 'saturate-150'];
@endphp

<x-markas.image-compare aria-label="Photo edit, before and after">
    @foreach ($panels as $side => $tone)
        <x-slot :name="$side">
            <div class="{{ $frame }} {{ $tone }}">
                <span class="{{ $sun }}"></span>
                <svg class="{{ $hills }}" viewBox="0 0 480 180" preserveAspectRatio="none" aria-hidden="true">
                    <path class="{{ $far }}" d="M0 90 70 40l70 45 80-55 90 65 80-50 90 35v100H0Z" />
                    <path class="{{ $near }}" d="M0 130c80-30 150-10 230-25s170 15 250-5v80H0Z" />
                    <path class="{{ $lake }}" d="M0 160c120-12 360-12 480 0v20H0Z" />
                </svg>
            </div>
        </x-slot>
    @endforeach
</x-markas.image-compare>
