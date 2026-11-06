<x-markas.prompt-input
    value="Summarize the March invoices by client"
    loading
    x-on:stop="loading = false"
    x-on:send="loading = true"
/>
