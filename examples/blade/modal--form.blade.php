<div class="flex justify-center">
    <x-markas.modal title="Invite a team member">
        <x-slot:trigger>
            <x-markas.button>
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6" /></svg>
                Invite member
            </x-markas.button>
        </x-slot:trigger>

        <div class="grid gap-4">
            <x-markas.input name="invite-name" label="Name" placeholder="Sari Wijaya" />
            <x-markas.input name="invite-email" type="email" label="Email" placeholder="sari@company.com" hint="We will send a link to join the workspace." />
        </div>

        <x-slot:footer>
            <x-markas.button variant="secondary" type="submit" value="cancel">Cancel</x-markas.button>
            <x-markas.button type="submit" value="invite">Send invite</x-markas.button>
        </x-slot:footer>
    </x-markas.modal>
</div>
