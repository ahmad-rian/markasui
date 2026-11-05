@php
    $box = 'relative h-56 overflow-y-auto rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
@endphp

<div role="region" aria-label="Release notes" tabindex="0" class="{{ $box }}">
    <x-markas.scroll-progress target="parent" />
    <article class="space-y-3 p-5 text-sm text-muted">
        <h3 class="text-base font-semibold text-ink">Release notes 2.4</h3>
        <p>
            Marquee, number ticker, and typing text join the animation category.
            Every animation stops when the reader prefers reduced motion.
        </p>
        <p>
            Avatar group now spreads out on hover and shows each name in a small
            tooltip. Hidden members are listed on the plus chip.
        </p>
        <p>
            Scroll progress follows the page or the nearest scrolling container,
            so it works in modals, drawers, and long side panels.
        </p>
        <p>
            Spotlight card lights up its border where the pointer is, and keeps
            the glow centered when a keyboard user tabs into it.
        </p>
    </article>
</div>
