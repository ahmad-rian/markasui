<div class="flex justify-center">
    <x-markas.toggle-group
        label="Text alignment"
        value="left"
        :items="[
            ['value' => 'left', 'label' => 'Align left', 'ariaLabel' => 'Align left'],
            ['value' => 'center', 'label' => 'Align center', 'ariaLabel' => 'Align center'],
            ['value' => 'right', 'label' => 'Align right', 'ariaLabel' => 'Align right'],
        ]"
    >
        <x-slot:left><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h14" /></svg></x-slot:left>
        <x-slot:center><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10M5 18h14" /></svg></x-slot:center>
        <x-slot:right><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M10 12h10M6 18h14" /></svg></x-slot:right>
    </x-markas.toggle-group>
</div>
