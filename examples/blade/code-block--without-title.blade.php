@php
    $code = <<<'CODE'
{
  "name": "acme-dashboard",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
CODE;
@endphp

<x-markas.code-block :code="$code" />
