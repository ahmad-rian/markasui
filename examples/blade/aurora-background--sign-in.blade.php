<x-markas.aurora-background class="rounded-xl border border-line bg-canvas px-6 py-10">
  <form class="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6">
    <div class="grid gap-1">
      <h3 class="text-lg font-semibold text-ink">Welcome back</h3>
      <p class="text-sm text-muted">Sign in to continue to your workspace.</p>
    </div>
    <x-markas.input label="Email" type="email" placeholder="you@company.com" />
    <x-markas.input label="Password" type="password" />
    <x-markas.button type="submit">Sign in</x-markas.button>
  </form>
</x-markas.aurora-background>
