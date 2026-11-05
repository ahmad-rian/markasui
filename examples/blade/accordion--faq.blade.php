<div class="grid gap-4">
    <div class="grid gap-1">
        <h2 class="text-base font-semibold text-ink">Frequently asked questions</h2>
        <p class="text-sm text-muted">Still have questions? Contact our support team.</p>
    </div>
    <x-markas.accordion :items="['trial' => 'Is there a free trial?', 'cancel' => 'Can I cancel at any time?', 'team' => 'Can I invite my team?', 'data' => 'Where is my data stored?']">
        <x-slot:trial>Yes. Every plan starts with a 14 day trial, no card required.</x-slot:trial>
        <x-slot:cancel>Yes. Your plan stays active until the end of the billing period.</x-slot:cancel>
        <x-slot:team>Invite as many members as your plan allows from the team settings.</x-slot:team>
        <x-slot:data>Data is stored in Jakarta and backed up every day.</x-slot:data>
    </x-markas.accordion>
</div>
