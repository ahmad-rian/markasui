<div class="grid gap-4">
    <x-markas.textarea name="bio" label="Short bio" placeholder="Tell us a little about yourself" hint="Up to 200 characters." />
    <x-markas.textarea name="address" label="Address" :rows="2" value="12 Main Street" error="Address is incomplete." />
</div>
