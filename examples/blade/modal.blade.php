<x-markas.modal title="Delete project?">
    <x-slot:trigger>
        <x-markas.button variant="danger">Delete project</x-markas.button>
    </x-slot:trigger>

    The project and all of its data will be deleted permanently.

    <x-slot:footer>
        <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
        <x-markas.button variant="danger" type="submit" value="delete">Delete</x-markas.button>
    </x-slot:footer>
</x-markas.modal>
