<form class="grid gap-4" method="POST" action="/masuk">
    <x-markas.input name="email" type="email" label="Email" value="rani@jenderalcorp.com" autocomplete="email" />
    <x-markas.input name="password" type="password" label="Kata sandi" value="rahasia" error="Kata sandi minimal 8 karakter." autocomplete="current-password" />
    <x-markas.checkbox name="ingat" label="Ingat saya di perangkat ini" />
    <x-markas.button type="submit" class="w-full">Masuk</x-markas.button>
</form>
