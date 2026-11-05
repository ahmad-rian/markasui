<form class="grid gap-4 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Create an account</p>
        <p class="text-sm text-muted">Start your free 14-day trial. No card required.</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <x-markas.input name="first_name" label="First name" autocomplete="given-name" />
        <x-markas.input name="last_name" label="Last name" autocomplete="family-name" />
    </div>
    <x-markas.input name="email" type="email" label="Work email" placeholder="you@company.com" autocomplete="email" />
    <x-markas.input name="password" type="password" label="Password" hint="At least 8 characters." autocomplete="new-password" />
    <x-markas.button type="submit" class="w-full">Create account</x-markas.button>
</form>
