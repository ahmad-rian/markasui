<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Markas Livewire' }}</title>
    <link rel="stylesheet" href="/markas/app.css">
    <style>body{background:var(--color-canvas);color:var(--color-ink)} .harness{padding:24px;display:grid;gap:16px}</style>
</head>
<body>
    <nav id="nav" style="display:flex;gap:12px;padding:8px 24px">
        <a href="/nav/a" wire:navigate id="to-a">Page A</a>
        <a href="/nav/b" wire:navigate id="to-b">Page B</a>
    </nav>
    {{ $slot }}
</body>
</html>
