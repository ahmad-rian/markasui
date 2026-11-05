@php
    $code = <<<'CODE'
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
CODE;
@endphp

<x-markas.code-block :code="$code" title="format-price.ts" />
