<fieldset class="min-w-0">
    <legend class="mb-3 text-sm font-medium text-ink">Notify me by</legend>
    <div class="flex flex-wrap gap-x-6 gap-y-3">
        <x-markas.checkbox name="channels[]" value="email" label="Email" checked />
        <x-markas.checkbox name="channels[]" value="sms" label="SMS" />
        <x-markas.checkbox name="channels[]" value="push" label="Push" checked />
        <x-markas.checkbox name="channels[]" value="slack" label="Slack" />
    </div>
</fieldset>
