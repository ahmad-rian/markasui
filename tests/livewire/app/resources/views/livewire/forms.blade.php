<div class="harness">
    <button type="button" id="set-server" wire:click="setFromServer">Set from server</button>
    <pre id="state">{{ json_encode($this->state()) }}</pre>

    <div data-test="input"><x-markas.input label="Text" wire:model.live="text" /></div>
    <div data-test="blur"><x-markas.input label="Blurred" wire:model.live.blur="blurred" /></div>
    <div data-test="textarea"><x-markas.textarea label="Bio" wire:model.live.debounce.200ms="bio" /></div>
    <div data-test="select"><x-markas.select label="City" wire:model.live="city">
        <option value="jakarta">Jakarta</option><option value="bandung">Bandung</option><option value="surabaya">Surabaya</option>
    </x-markas.select></div>
    <div data-test="checkbox"><x-markas.checkbox label="Agree" wire:model.live="agree" /></div>
    <div data-test="tags">
        <x-markas.checkbox label="React" value="react" wire:model.live="tags" />
        <x-markas.checkbox label="Vue" value="vue" wire:model.live="tags" />
    </div>
    <div data-test="switch"><x-markas.switch label="Notify" wire:model.live="notify" /></div>
    <div data-test="radio"><x-markas.radio-group name="plan" label="Plan" wire:model.live="plan" :options="[['value' => 'free', 'label' => 'Free'], ['value' => 'pro', 'label' => 'Pro'], ['value' => 'business', 'label' => 'Business']]" /></div>
    <div data-test="slider"><x-markas.slider label="Volume" wire:model.live="volume" /></div>
    <div data-test="combobox"><x-markas.combobox label="Country" wire:model.live="country" wire:markas-change="pick($event.detail)" :options="[['value' => 'id', 'label' => 'Indonesia'], ['value' => 'jp', 'label' => 'Japan'], ['value' => 'sg', 'label' => 'Singapore']]" /></div>
    <div data-test="currency"><x-markas.currency-input label="Amount" wire:model.live="amount" :presets="[50000, 100000, 250000]" /></div>
    <div data-test="otp"><x-markas.input-otp label="Code" wire:model.live="code" /></div>
    <div data-test="toggle-group"><x-markas.toggle-group label="View" wire:model.live="view" :items="[['value' => 'day', 'label' => 'Day'], ['value' => 'week', 'label' => 'Week'], ['value' => 'month', 'label' => 'Month']]" /></div>
    <div data-test="toggle-group-multi"><x-markas.toggle-group type="multiple" label="Styles" wire:model.live="styles" :items="[['value' => 'bold', 'label' => 'B'], ['value' => 'italic', 'label' => 'I']]" /></div>
    <div data-test="toggle"><x-markas.toggle wire:model.live="bold">Bold</x-markas.toggle></div>
    <div data-test="dropzone"><x-markas.file-dropzone wire:model="upload" /></div>
    <div data-test="dropzone-multi"><x-markas.file-dropzone multiple wire:model="uploads" /></div>
    <div data-test="modal">
        <button type="button" id="open-modal" wire:click="openModal">Open modal from server</button>
        <x-markas.modal title="Edit" wire:model="showModal">
            <p>Body</p>
            <x-slot:footer><button type="submit" id="modal-done">Done</button></x-slot:footer>
        </x-markas.modal>
    </div>
    <div data-test="drawer"><x-markas.drawer title="Filters" wire:model.live="showDrawer"><x-slot:trigger><button type="button">Open drawer</button></x-slot:trigger>
        Drawer body
    </x-markas.drawer></div>
    <div data-test="alert"><x-markas.alert-dialog title="Sure?" wire:model="confirmOpen" wire:markas-action="confirm"><x-slot:trigger><button type="button">Ask</button></x-slot:trigger>
        Really?
    </x-markas.alert-dialog></div>
    <div data-test="dropdown"><x-markas.dropdown-menu label="Actions" wire:markas-select="pick($event.detail)" :items="[['label' => 'Edit', 'value' => 'edit'], ['label' => 'Delete', 'value' => 'delete']]" /></div>
    <div data-test="toast"><button type="button" id="server-toast" wire:click="toast">Toast</button><x-markas.toast /></div>
    <div data-test="command"><x-markas.command :items="[['group' => 'Go', 'label' => 'Settings', 'value' => 'settings']]" wire:markas-select="pick($event.detail)"><x-slot:trigger><button type="button" id="open-command">Cmd</button></x-slot:trigger></x-markas.command></div>
    <div data-test="ctx"><x-markas.context-menu :items="[['label' => 'Rename', 'value' => 'rename']]" wire:markas-select="pick($event.detail)">
        <div id="ctx-area" style="height:40px">Right-click</div>
    </x-markas.context-menu></div>
</div>
