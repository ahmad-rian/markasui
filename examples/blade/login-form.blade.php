<form class="grid gap-4" method="POST" action="/login">
    <x-markas.input name="email" type="email" label="Email" value="rani@jenderalcorp.com" autocomplete="email" />
    <x-markas.input name="password" type="password" label="Password" value="secret" error="Password must be at least 8 characters" autocomplete="current-password" />
    <x-markas.checkbox name="remember" label="Remember me on this device" />
    <x-markas.button type="submit" class="w-full">Sign in</x-markas.button>
</form>
