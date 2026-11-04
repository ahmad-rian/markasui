<div class="grid gap-6">
    <x-markas.radio-group
        name="plan"
        label="Subscription plan"
        value="pro"
        :options="[
            ['value' => 'free', 'label' => 'Free', 'description' => 'For personal projects.'],
            ['value' => 'pro', 'label' => 'Pro', 'description' => 'For small teams of up to 10 people.'],
            ['value' => 'business', 'label' => 'Business', 'description' => 'For organizations with custom needs.'],
        ]"
    />
    <x-markas.radio-group
        name="billing"
        label="Billing cycle"
        value="monthly"
        orientation="horizontal"
        :options="[
            ['value' => 'monthly', 'label' => 'Monthly'],
            ['value' => 'yearly', 'label' => 'Yearly'],
        ]"
    />
</div>
