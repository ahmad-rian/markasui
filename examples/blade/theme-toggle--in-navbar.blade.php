@php
    $link = 'rounded-sm transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';
@endphp
<header class="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface py-2 pr-2 pl-3">
    <a href="#" class="flex items-center gap-2 text-sm font-semibold text-ink {{ $link }}"><svg class="size-6 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true"><polygon points="354,578 1256,138 1171,430 268,868" class="fill-ink/15" /><polygon points="553,443 1455,3 1370,295 467,733" class="fill-ink/55" /><polygon points="421,762 1325,318 1240,611 336,1050" class="fill-success/35" /><polygon points="265,1073 1169,629 1084,922 180,1362" class="fill-ink/25" /><polygon points="93,965 997,521 912,814 8,1253" class="fill-ink/75" /><polygon points="347,1135 1251,691 1166,984 262,1424" class="fill-success" /></svg>MarkasUI</a>
    <nav aria-label="Main" class="hidden items-center gap-4 text-sm text-muted sm:flex">
        <a href="#docs" class="{{ $link }}">Docs</a>
        <a href="#components" class="{{ $link }}">Components</a>
        <a href="#pricing" class="{{ $link }}">Pricing</a>
    </nav>
    <x-markas.theme-toggle size="sm" animation="eclipse" />
</header>
