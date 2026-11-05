<div class="grid gap-4">
    <x-markas.select name="country" label="Country" hint="Used to calculate tax on your invoices.">
        <option value="" disabled selected>Select a country</option>
        <option value="id">Indonesia</option>
        <option value="my">Malaysia</option>
        <option value="sg">Singapore</option>
    </x-markas.select>
    <x-markas.select name="industry" label="Industry" error="Choose the industry that fits best.">
        <option value="" disabled selected>Select an industry</option>
        <option value="education">Education</option>
        <option value="finance">Finance</option>
        <option value="retail">Retail</option>
    </x-markas.select>
</div>
