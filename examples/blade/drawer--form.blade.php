<div class="flex justify-center">
    <x-markas.drawer title="Edit profile">
        <x-slot:trigger>
            <x-markas.button>Edit profile</x-markas.button>
        </x-slot:trigger>

        <div class="grid gap-4">
            <x-markas.input name="profile-name" label="Display name" placeholder="Budi Santoso" />
            <x-markas.input name="profile-role" label="Job title" placeholder="Product designer" />
            <x-markas.input name="profile-website" type="url" label="Website" placeholder="https://example.com" />
        </div>

        <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
            <x-markas.button type="submit" value="save">Save changes</x-markas.button>
        </x-slot:footer>
    </x-markas.drawer>
</div>
