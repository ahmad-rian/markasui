<x-markas.card title="Delete project" description="This removes the project, its files, and all deployments. This cannot be undone.">
    <p class="text-muted">Project: <span class="font-medium text-ink">marketing-site</span></p>

    <x-slot:footer>
        <x-markas.button variant="secondary" size="sm" class="ml-auto">Cancel</x-markas.button>
        <x-markas.button variant="danger" size="sm">Delete project</x-markas.button>
    </x-slot:footer>
</x-markas.card>
