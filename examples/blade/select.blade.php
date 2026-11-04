<div class="grid gap-4">
    <x-markas.select name="city" label="City" hint="Choose your city.">
        <option value="jakarta">Jakarta</option>
        <option value="bandung" selected>Bandung</option>
        <option value="surabaya">Surabaya</option>
    </x-markas.select>
    <x-markas.select name="role" label="Role" error="Role is required.">
        <option value="">Choose a role</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
    </x-markas.select>
    <x-markas.select name="plan" label="Plan" disabled>
        <option value="free">Free</option>
    </x-markas.select>
</div>
