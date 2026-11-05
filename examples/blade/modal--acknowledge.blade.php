<div class="flex justify-center">
    <x-markas.modal title="What's new in version 2.4">
        <x-slot:trigger>
            <x-markas.button variant="secondary">View release notes</x-markas.button>
        </x-slot:trigger>

        <ul class="grid list-disc gap-2 pl-5">
            <li>Dark mode now follows your system setting.</li>
            <li>Export reports to CSV from any table.</li>
            <li>Search results load twice as fast.</li>
        </ul>

        <x-slot:footer>
            <x-markas.button type="submit" value="close">Got it</x-markas.button>
        </x-slot:footer>
    </x-markas.modal>
</div>
