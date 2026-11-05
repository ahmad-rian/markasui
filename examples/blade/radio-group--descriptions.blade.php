<x-markas.radio-group
    name="shipping"
    label="Shipping method"
    value="express"
    :options="[
        ['value' => 'standard', 'label' => 'Standard', 'description' => 'Arrives in 4 to 6 business days. Free.'],
        ['value' => 'express', 'label' => 'Express', 'description' => 'Arrives in 1 to 2 business days. $12.'],
        ['value' => 'pickup', 'label' => 'Store pickup', 'description' => 'Ready for pickup tomorrow at 10:00.'],
    ]"
/>
