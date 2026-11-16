@props([
    'label' => 'Carousel',
    'perView' => 1,
    'showDots' => false,
    'previousLabel' => 'Previous slide',
    'nextLabel' => 'Next slide',
    'slideLabel' => '{index} of {total}',
    'dotLabel' => 'Go to slide {index}',
])

@php
    $root = 'w-full';
    $viewport = 'relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden';
    $slideClass = 'min-w-0 shrink-0 snap-start';
    $perViews = [
        1 => 'basis-full',
        2 => 'basis-[calc((100%-1rem)/2)]',
        3 => 'basis-[calc((100%-2rem)/3)]',
    ];
    $controls = 'mt-3 flex items-center gap-2';
    $dots = 'flex items-center';
    $dot = 'group inline-flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $dotMark = 'h-2 w-2 rounded-full bg-faint transition-all duration-150 ease-out group-data-[state=active]:w-4 group-data-[state=active]:bg-primary motion-reduce:transition-none';
    $buttons = 'ml-auto flex items-center gap-2';
    $navButton = 'inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';
    $icon = 'size-4';

    // Setiap named slot menjadi satu slide, sesuai urutan penulisan.
    $slides = array_values(array_filter(
        $__laravel_slots ?? [],
        fn ($value, $key) => $key !== '__default',
        ARRAY_FILTER_USE_BOTH,
    ));
    $total = count($slides);
    $format = fn (string $template, int $index) => str_replace(['{index}', '{total}'], [$index, $total], $template);
    // Same id on every render, so Livewire's morph (which matches elements by id) keeps the element. Pass `id` to set it.
    $idKey = 'markas-carousel|'.(isset($this) && $this instanceof \Livewire\Component ? $this->getId() : '').'|'.($attributes->get('wire:key') ?? $attributes->whereStartsWith('wire:model')->first() ?? $attributes->get('name')).'|';
    for ($idIndex = 0; $__env->hasRenderedOnce($idKey.$idIndex); $idIndex++);
    $__env->markAsRenderedOnce($idKey.$idIndex);
    $id = $attributes->get('id') ?? 'markas-carousel-'.hash('xxh32', $idKey.$idIndex);
    $viewportId = $id.'-viewport';
@endphp

<div
    x-data="{
        index: 0,
        atStart: true,
        atEnd: @js($total <= 1),
        {{-- Baca slide terdekat dan apakah viewport sudah di ujung kiri atau kanan. --}}
        sync() {
            const el = this.$refs.viewport;
            const items = Array.from(el.children);
            const left = el.scrollLeft;
            this.index = items.reduce((best, item, i) => Math.abs(item.offsetLeft - left) < Math.abs((items[best]?.offsetLeft ?? 0) - left) ? i : best, 0);
            this.atStart = left <= 1;
            this.atEnd = left + el.clientWidth >= el.scrollWidth - 1;
        },
        goTo(index) {
            const target = this.$refs.viewport.children[index];
            if (target) this.$refs.viewport.scrollTo({ left: target.offsetLeft });
        },
        step(direction) {
            const total = this.$refs.viewport.children.length;
            this.goTo(Math.min(Math.max(this.index + direction, 0), total - 1));
        },
    }"
    x-init="sync()"
    @keydown.right="if (! $event.defaultPrevented) { $event.preventDefault(); step(1); }"
    @keydown.left="if (! $event.defaultPrevented) { $event.preventDefault(); step(-1); }"
    {{ $attributes->merge(['id' => $id, 'role' => 'region', 'aria-roledescription' => 'carousel', 'aria-label' => $label])->class([$root]) }}
>
    <div x-ref="viewport" id="{{ $viewportId }}" tabindex="0" @scroll="sync()" class="{{ $viewport }}">
        @foreach ($slides as $index => $slide)
            <div role="group" aria-roledescription="slide" aria-label="{{ $format($slideLabel, $index + 1) }}" class="{{ $slideClass }} {{ $perViews[$perView] ?? $perViews[1] }}">{{ $slide }}</div>
        @endforeach
    </div>
    <div class="{{ $controls }}">
        @if ($showDots)
            <div class="{{ $dots }}">
                @foreach ($slides as $index => $slide)
                    <button
                        type="button"
                        aria-label="{{ $format($dotLabel, $index + 1) }}"
                        aria-controls="{{ $viewportId }}"
                        @if ($index === 0) aria-current="true" @endif
                        data-state="{{ $index === 0 ? 'active' : 'inactive' }}"
                        :aria-current="index === {{ $index }} ? 'true' : null"
                        :data-state="index === {{ $index }} ? 'active' : 'inactive'"
                        @click="goTo({{ $index }})"
                        class="{{ $dot }}"
                    ><span aria-hidden="true" class="{{ $dotMark }}"></span></button>
                @endforeach
            </div>
        @endif
        <div class="{{ $buttons }}">
            <button
                type="button"
                aria-label="{{ $previousLabel }}"
                aria-controls="{{ $viewportId }}"
                disabled
                :disabled="atStart"
                @click="step(-1)"
                class="{{ $navButton }}"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
                type="button"
                aria-label="{{ $nextLabel }}"
                aria-controls="{{ $viewportId }}"
                @if ($total <= 1) disabled @endif
                :disabled="atEnd"
                @click="step(1)"
                class="{{ $navButton }}"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="{{ $icon }}"><path d="m9 18 6-6-6-6" /></svg>
            </button>
        </div>
    </div>
</div>
