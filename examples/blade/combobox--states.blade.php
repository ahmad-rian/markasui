<div class="grid gap-4">
    <x-markas.combobox
        name="assignee"
        label="Assignee"
        placeholder="Search people"
        hint="Only members of this project are listed."
        :options="[['value' => 'ana', 'label' => 'Ana Putri'], ['value' => 'budi', 'label' => 'Budi Santoso'], ['value' => 'citra', 'label' => 'Citra Lestari']]"
    />
    <x-markas.combobox
        name="reviewer"
        label="Reviewer"
        placeholder="Search people"
        error="Choose a reviewer before submitting."
        :options="[['value' => 'ana', 'label' => 'Ana Putri'], ['value' => 'budi', 'label' => 'Budi Santoso'], ['value' => 'citra', 'label' => 'Citra Lestari']]"
    />
    <x-markas.combobox
        name="owner"
        label="Owner"
        value="budi"
        disabled
        :options="[['value' => 'ana', 'label' => 'Ana Putri'], ['value' => 'budi', 'label' => 'Budi Santoso'], ['value' => 'citra', 'label' => 'Citra Lestari']]"
    />
</div>
