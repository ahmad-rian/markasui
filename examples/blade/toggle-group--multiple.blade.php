<div class="flex justify-center">
    <x-markas.toggle-group
        type="multiple"
        label="Text style"
        :value="['bold', 'underline']"
        :items="[
            ['value' => 'bold', 'label' => 'Bold', 'ariaLabel' => 'Bold'],
            ['value' => 'italic', 'label' => 'Italic', 'ariaLabel' => 'Italic'],
            ['value' => 'underline', 'label' => 'Underline', 'ariaLabel' => 'Underline'],
        ]"
    >
        <x-slot:bold><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg></x-slot:bold>
        <x-slot:italic><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4h9M5 20h9M15 4 9 20" /></svg></x-slot:italic>
        <x-slot:underline><svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14" /></svg></x-slot:underline>
    </x-markas.toggle-group>
</div>
