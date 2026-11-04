<div class="grid gap-4">
    <x-markas.select name="kota" label="Kota" hint="Pilih kota domisili.">
        <option value="jakarta">Jakarta</option>
        <option value="bandung" selected>Bandung</option>
        <option value="surabaya">Surabaya</option>
    </x-markas.select>
    <x-markas.select name="peran" label="Peran" error="Peran wajib dipilih.">
        <option value="">Pilih peran</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
    </x-markas.select>
    <x-markas.select name="paket" label="Paket" disabled>
        <option value="gratis">Gratis</option>
    </x-markas.select>
</div>
