<x-markas.currency-input
    label="Monthly budget"
    name="budget"
    currency="USD"
    hint="Billed in US dollars at the end of each month"
    :value="1250.5"
    :presets="[100, 500, 1000, 5000]"
    presets-label="Suggested budgets"
/>
