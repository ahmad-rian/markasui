<div class="flex items-start gap-4 rounded-lg border border-line bg-surface p-4 transition-colors duration-150 ease-out has-checked:border-primary motion-reduce:transition-none">
    <span class="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3z" /><path d="m9 12 2 2 4-4" /></svg>
    </span>
    <div class="grid flex-1 gap-0.5">
        <p class="text-sm font-medium text-ink">Two-factor authentication</p>
        <p class="text-sm text-muted">Ask for a code from your authenticator app each time you sign in.</p>
    </div>
    <x-markas.switch name="two_factor" aria-label="Two-factor authentication" checked />
</div>
