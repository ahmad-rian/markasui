@php
    $figure = 'grid gap-2';
    $caption = 'text-sm text-muted';
    $frame = 'relative grid aspect-[3/2] w-full place-items-center bg-linear-to-br from-primary-soft via-surface to-warning/25';
    $shadow = 'absolute bottom-7 h-3 w-28 rounded-full bg-ink/15 blur-sm';
    $bottle = 'relative mt-6 h-40 w-20 rounded-t-[2.5rem] rounded-b-2xl bg-linear-to-b from-success/70 to-success';
    $cap = 'absolute -top-5 left-1/2 h-6 w-8 -translate-x-1/2 rounded-md bg-ink';
    $label = 'absolute inset-x-2 top-14 rounded-md bg-surface/90 py-2.5 text-center text-xs font-semibold text-ink';

    // One deterministic product shot, flat and soft (before) or crisp (after).
    $shots = ['before' => 'blur-[1.5px] brightness-90 grayscale-[0.6]', 'after' => ''];
@endphp

<figure class="{{ $figure }}">
    <x-markas.image-compare aria-label="Product photo, original and retouched" before-label="Original" after-label="Retouched">
        @foreach ($shots as $side => $tone)
            <x-slot :name="$side">
                <div class="{{ $frame }} {{ $tone }}">
                    <span class="{{ $shadow }}"></span>
                    <div class="{{ $bottle }}">
                        <span class="{{ $cap }}"></span>
                        <span class="{{ $label }}">Calm</span>
                    </div>
                </div>
            </x-slot>
        @endforeach
    </x-markas.image-compare>
    <figcaption class="{{ $caption }}">Drag the handle to compare the studio retouch.</figcaption>
</figure>
