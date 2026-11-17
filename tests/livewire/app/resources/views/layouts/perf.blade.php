<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Markas Livewire perf</title>
    <link rel="stylesheet" href="/markas/app.css">
    <style>body{background:var(--color-canvas);color:var(--color-ink)} .harness{padding:24px;display:grid;gap:16px}</style>
    <script>
        // Perf probes, registered before Livewire and Alpine start.
        window.__perf = { longTasks: [], morphs: [], alpineStart: 0, alpineEnd: 0, navStart: 0, navEnd: 0 };
        try {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) window.__perf.longTasks.push(Math.round(entry.duration));
            }).observe({ type: 'longtask', buffered: true });
        } catch (error) {
            window.__perf.longTasks.push(-1);
        }
        document.addEventListener('alpine:init', () => { window.__perf.alpineStart = performance.now(); });
        document.addEventListener('alpine:initialized', () => { window.__perf.alpineEnd = performance.now(); });
        document.addEventListener('livewire:navigating', () => { window.__perf.navStart = performance.now(); });
        document.addEventListener('livewire:navigated', () => { window.__perf.navEnd = performance.now(); });
        document.addEventListener('livewire:init', () => {
            let started = 0;
            window.Livewire.hook('morph', () => { started = performance.now(); });
            window.Livewire.hook('morphed', () => { window.__perf.morphs.push(performance.now() - started); });
        });
    </script>
</head>
<body>
    {{ $slot }}
</body>
</html>
