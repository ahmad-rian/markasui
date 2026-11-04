@props([
    'initial' => [],
])

@php
    $region = 'pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2';
    $card = 'pointer-events-auto flex items-start gap-3 rounded-lg border bg-surface p-4 text-sm text-ink shadow-lg transition-[opacity,translate] duration-200 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none';
    $variants = [
        'default' => 'border-line',
        'success' => 'border-success/40',
        'danger' => 'border-danger/40',
    ];
    $iconBase = 'mt-0.5 size-4 shrink-0';
    $iconVariants = [
        'default' => '',
        'success' => 'text-success',
        'danger' => 'text-danger',
    ];
    $icons = [
        'default' => '',
        'success' => 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8.5 12l2.5 2.5 4.5-5',
        'danger' => 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM15 9l-6 6M9 9l6 6',
    ];
    $content = 'grid flex-1 gap-1';
    $titleClass = 'font-semibold';
    $descriptionClass = 'text-muted';
    $close = '-mt-1 -mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
@endphp

<div
    x-data="{
        toasts: [],
        timers: {},
        nextId: 0,
        variants: @js($variants),
        iconVariants: @js($iconVariants),
        icons: @js($icons),
        add(detail) {
            const variant = detail.variant in this.variants ? detail.variant : 'default';
            const duration = Number.isFinite(detail.duration) ? detail.duration : 5000;
            const id = ++this.nextId;
            this.toasts = [...this.toasts, { id, title: String(detail.title ?? ''), description: detail.description ?? '', variant }];
            if (duration > 0) this.start(id, duration);
        },
        start(id, ms) {
            this.timers[id] = { handle: setTimeout(() => this.dismiss(id), ms), remaining: ms, startedAt: Date.now() };
        },
        dismiss(id) {
            clearTimeout(this.timers[id]?.handle);
            delete this.timers[id];
            this.toasts = this.toasts.filter((item) => item.id !== id);
        },
        pause(id) {
            const timer = this.timers[id];
            if (!timer?.handle) return;
            clearTimeout(timer.handle);
            this.timers[id] = { remaining: timer.remaining - (Date.now() - timer.startedAt), startedAt: 0 };
        },
        resume(id) {
            const timer = this.timers[id];
            if (!timer || timer.handle) return;
            this.start(id, Math.max(timer.remaining, 0));
        },
    }"
    x-init="@js(array_values($initial)).forEach((detail) => add(detail))"
    x-on:markas-toast.window="add($event.detail ?? {})"
    {{ $attributes->merge(['role' => 'status', 'aria-live' => 'polite', 'aria-label' => 'Notifikasi'])->class([$region]) }}
>
    <template x-for="item in toasts" :key="item.id">
        <div
            data-state="open"
            class="{{ $card }}"
            :class="variants[item.variant]"
            x-on:mouseenter="pause(item.id)"
            x-on:mouseleave="if (! $el.contains(document.activeElement)) resume(item.id)"
            x-on:focusin="pause(item.id)"
            x-on:focusout="if (! $el.contains($event.relatedTarget) && ! $el.matches(':hover')) resume(item.id)"
        >
            <template x-if="icons[item.variant]">
                <svg class="{{ $iconBase }}" :class="iconVariants[item.variant]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[item.variant]" /></svg>
            </template>
            <div class="{{ $content }}">
                <p class="{{ $titleClass }}" x-text="item.title"></p>
                <template x-if="item.description">
                    <p class="{{ $descriptionClass }}" x-text="item.description"></p>
                </template>
            </div>
            <button type="button" class="{{ $close }}" aria-label="Tutup" x-on:click="dismiss(item.id)">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
        </div>
    </template>
</div>
