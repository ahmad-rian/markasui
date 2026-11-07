@php
    $scroller = 'h-96 overflow-y-auto rounded-xl border border-line bg-canvas px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary';
    $intro = 'py-6';
    $title = 'text-lg font-semibold text-ink';
    $hint = 'mt-1 text-sm text-muted';
    $stack = 'gap-4';
    $card = 'grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-line bg-surface p-5';
    $featured = 'grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-primary bg-surface p-5';
    $name = 'text-base font-semibold text-ink';
    $note = 'mt-1 text-sm text-muted';
    $price = 'text-right text-xl font-semibold text-ink tabular-nums';
    $period = 'block text-xs font-normal text-muted';
    $footer = 'col-span-2 flex items-center justify-between gap-3';
    $perks = 'text-sm text-muted';
    $plans = [
        ['name' => 'Starter', 'note' => 'For solo makers', 'price' => 'Rp 0', 'perks' => '1 project, community help', 'featured' => false],
        ['name' => 'Team', 'note' => 'For small studios', 'price' => 'Rp 149.000', 'perks' => '10 projects, chat support', 'featured' => true],
        ['name' => 'Business', 'note' => 'For growing companies', 'price' => 'Rp 499.000', 'perks' => 'Unlimited, priority support', 'featured' => false],
    ];
@endphp

<section tabindex="0" aria-label="Pricing plans" class="{{ $scroller }}">
    <div class="{{ $intro }}">
        <h3 class="{{ $title }}">Simple pricing in Rupiah</h3>
        <p class="{{ $hint }}">Prices per month, tax included</p>
    </div>
    <x-markas.stacking-cards variant="blur" :offset="20" :class="$stack">
        @foreach ($plans as $plan)
            <article class="{{ $plan['featured'] ? $featured : $card }}">
                <div>
                    <h4 class="{{ $name }}">{{ $plan['name'] }}</h4>
                    <p class="{{ $note }}">{{ $plan['note'] }}</p>
                </div>
                <p class="{{ $price }}">{{ $plan['price'] }}<span class="{{ $period }}">per month</span></p>
                <div class="{{ $footer }}">
                    <p class="{{ $perks }}">{{ $plan['perks'] }}</p>
                    <x-markas.button :variant="$plan['featured'] ? 'primary' : 'secondary'">Choose {{ $plan['name'] }}</x-markas.button>
                </div>
            </article>
        @endforeach
    </x-markas.stacking-cards>
</section>
