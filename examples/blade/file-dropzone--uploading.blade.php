@php
    $uploads = [
        ['name' => 'keynote-deck.pdf', 'size' => 5872025, 'type' => 'application/pdf', 'progress' => 100],
        ['name' => 'product-demo.mp4', 'size' => 41943040, 'type' => 'video/mp4', 'progress' => 72],
        ['name' => 'voiceover.wav', 'size' => 9437184, 'type' => 'audio/wav', 'progress' => 35],
    ];
@endphp

{{-- Simulated upload: +9% every 150ms, sent back to the dropzone as file-progress events. A real app reports progress from its upload request. --}}
<div
    x-data="{
        started: new Set(),
        simulate(event) {
            const zone = event.target.closest('[x-data]');
            for (const { name } of event.detail) {
                if (this.started.has(name)) continue;
                this.started.add(name);
                let value = 0;
                const send = () => zone.dispatchEvent(new CustomEvent('file-progress', { detail: { name, progress: value } }));
                send();
                const timer = setInterval(() => {
                    value = Math.min(100, value + 9);
                    send();
                    if (value === 100) clearInterval(timer);
                }, 150);
            }
        },
    }"
    x-on:files-change="simulate($event)"
>
    <x-markas.file-dropzone multiple hint="Add a file to watch it upload" :files="$uploads" />
</div>
