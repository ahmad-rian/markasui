<div class="flex flex-col items-center gap-5">
    <div class="grid w-full grid-cols-6 gap-2">
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="rotate" variant="outline" size="lg" />
            <span class="text-xs text-muted">Rotate</span>
        </div>
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="morph" variant="outline" size="lg" />
            <span class="text-xs text-muted">Morph</span>
        </div>
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="flip" variant="outline" size="lg" />
            <span class="text-xs text-muted">Flip</span>
        </div>
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="slide" variant="outline" size="lg" />
            <span class="text-xs text-muted">Slide</span>
        </div>
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="eclipse" variant="outline" size="lg" />
            <span class="text-xs text-muted">Eclipse</span>
        </div>
        <div class="flex flex-col items-center gap-2">
            <x-markas.theme-toggle animation="spring" variant="outline" size="lg" />
            <span class="text-xs text-muted">Spring</span>
        </div>
    </div>
    <x-markas.button variant="secondary" size="sm" x-data x-on:click="document.dispatchEvent(new Event('markas-theme-demo'))">Play all</x-markas.button>
</div>
