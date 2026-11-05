<x-markas.tabs :items="['profile' => 'Profile', 'password' => 'Password']" default-value="profile">
    <x-slot:profile>
        <div class="grid gap-4">
            <x-markas.input name="name" label="Name" value="Siti Aminah" />
            <x-markas.input name="email" type="email" label="Email" value="siti@example.com" />
            <div>
                <x-markas.button>Save changes</x-markas.button>
            </div>
        </div>
    </x-slot:profile>
    <x-slot:password>
        <div class="grid gap-4">
            <x-markas.input name="current-password" type="password" label="Current password" />
            <x-markas.input name="new-password" type="password" label="New password" hint="At least 8 characters" />
            <div>
                <x-markas.button>Update password</x-markas.button>
            </div>
        </div>
    </x-slot:password>
</x-markas.tabs>
