<div class="harness">
    <pre id="state">{{ json_encode([$text, $debounced, $bio, $amount, $debouncedAmount, $country]) }}</pre>
    <div data-test="input"><x-markas.input label="Text" wire:model.live="text" /></div>
    <div data-test="input-debounced"><x-markas.input label="Debounced" wire:model.live.debounce.250ms="debounced" /></div>
    <div data-test="textarea"><x-markas.textarea label="Bio" wire:model.live="bio" /></div>
    <div data-test="currency"><x-markas.currency-input label="Amount" wire:model.live="amount" /></div>
    <div data-test="currency-debounced"><x-markas.currency-input label="Debounced amount" wire:model.live.debounce.250ms="debouncedAmount" /></div>
    <div data-test="combobox"><x-markas.combobox label="Country" wire:model.live="country" :options="[['value' => 'id', 'label' => 'Indonesia'], ['value' => 'jp', 'label' => 'Japan'], ['value' => 'sg', 'label' => 'Singapore']]" /></div>
</div>
