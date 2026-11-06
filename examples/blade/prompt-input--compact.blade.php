@php
    $card = 'grid gap-3 rounded-xl border border-line bg-surface p-4';
    $head = 'flex items-center gap-3';
    $avatar = 'grid size-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink';
    $name = 'text-sm font-semibold text-ink';
    $meta = 'text-xs text-muted';
    $quote = 'rounded-lg bg-subtle px-3 py-2 text-sm text-ink';
@endphp

<div class="{{ $card }}">
    <div class="{{ $head }}">
        <span aria-hidden="true" class="{{ $avatar }}">RS</span>
        <div>
            <p class="{{ $name }}">Rina Santoso</p>
            <p class="{{ $meta }}">Asked about order #INV-2041</p>
        </div>
    </div>
    <p class="{{ $quote }}">Can I pay the balance by bank transfer?</p>
    <x-markas.prompt-input
        :attachments="false"
        :max-height="120"
        placeholder-label="Reply to Rina"
        input-label="Reply"
    />
</div>
