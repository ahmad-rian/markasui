<div class="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-2">
    <span class="flex items-center gap-2 text-sm font-semibold text-ink"><svg class="size-6 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true"><polygon points="354,578 1256,138 1171,430 268,868" class="fill-ink/15" /><polygon points="553,443 1455,3 1370,295 467,733" class="fill-ink/55" /><polygon points="421,762 1325,318 1240,611 336,1050" class="fill-success/35" /><polygon points="265,1073 1169,629 1084,922 180,1362" class="fill-ink/25" /><polygon points="93,965 997,521 912,814 8,1253" class="fill-ink/75" /><polygon points="347,1135 1251,691 1166,984 262,1424" class="fill-success" /></svg>MarkasUI</span>
    <x-markas.command
        placeholder-label="Run a command..."
        :items="[
            ['group' => 'Workspace', 'label' => 'Create project', 'value' => 'create-project', 'shortcut' => 'Ctrl+N'],
            ['group' => 'Workspace', 'label' => 'Invite member', 'value' => 'invite', 'shortcut' => 'Ctrl+I'],
            ['group' => 'Account', 'label' => 'Switch theme', 'value' => 'theme'],
            ['group' => 'Account', 'label' => 'Sign out', 'value' => 'sign-out'],
        ]"
    >
        <x-slot:trigger>
            <x-markas.button variant="ghost" size="sm" aria-label="Open commands">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>
            </x-markas.button>
        </x-slot:trigger>
    </x-markas.command>
</div>
