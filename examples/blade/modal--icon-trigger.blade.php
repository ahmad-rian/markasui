<div class="flex justify-center">
    <x-markas.modal title="Share project">
        <x-slot:trigger>
            <x-markas.button variant="secondary" aria-label="Share" class="size-10 px-0">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" /></svg>
            </x-markas.button>
        </x-slot:trigger>

        Anyone with the link can view this project. Only members can edit it.

        <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
            <x-markas.button type="submit" value="copy">Copy link</x-markas.button>
        </x-slot:footer>
    </x-markas.modal>
</div>
