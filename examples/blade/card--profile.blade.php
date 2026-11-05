<x-markas.card class="mx-auto max-w-sm">
    <div class="flex items-center gap-4">
        <x-markas.avatar name="Sarah Miller" size="lg" alt="" />
        <div class="grid gap-0.5">
            <h3 class="text-base font-semibold text-ink">Sarah Miller</h3>
            <p class="text-muted">Product designer at Northwind</p>
        </div>
    </div>
    <p class="mt-4 text-muted">Designs onboarding flows and keeps the component library tidy.</p>

    <x-slot:footer>
        <x-markas.button size="sm">Message</x-markas.button>
        <x-markas.button variant="secondary" size="sm">View profile</x-markas.button>
    </x-slot:footer>
</x-markas.card>
