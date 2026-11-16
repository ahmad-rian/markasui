<div class="harness">
    <x-markas.tabs :items="['a' => 'A', 'b' => 'B']"><x-slot:a>Outside A</x-slot:a><x-slot:b>Outside B</x-slot:b></x-markas.tabs>
    <x-markas.popover label="Outside">Outside panel</x-markas.popover>
    @island(name: 'stats')
        <div id="island">
            <span id="lw-tick">{{ $tick }}</span>
            <button type="button" id="lw-bump" wire:click="bump" wire:island="stats">bump island</button>
            <x-markas.popover wire:key="inside-popover" label="Inside">Inside panel</x-markas.popover>
            <x-markas.tabs wire:key="inside-tabs" :items="['x' => 'X', 'y' => 'Y']"><x-slot:x>In X</x-slot:x><x-slot:y>In Y</x-slot:y></x-markas.tabs>
        </div>
    @endisland
</div>
