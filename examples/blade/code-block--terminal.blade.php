@php
    $code = <<<'CODE'
pnpm add markasui
pnpm markasui init
pnpm markasui add carousel
CODE;
@endphp

<x-markas.code-block :code="$code" title="Terminal" />
