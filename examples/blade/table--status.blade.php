@php
    // Table Blade hanya teks, jadi sel berisi Badge ditulis langsung dengan class yang sama seperti komponen Table.
    $invoices = [
        ['invoice' => 'INV-1024', 'customer' => 'Budi Santoso', 'status' => 'Paid', 'amount' => '$250.00'],
        ['invoice' => 'INV-1025', 'customer' => 'Siti Aminah', 'status' => 'Pending', 'amount' => '$85.00'],
        ['invoice' => 'INV-1026', 'customer' => 'John Carter', 'status' => 'Overdue', 'amount' => '$1,200.00'],
        ['invoice' => 'INV-1027', 'customer' => 'Dewi Lestari', 'status' => 'Draft', 'amount' => '$40.00'],
    ];
    $statusVariants = ['Paid' => 'success', 'Pending' => 'warning', 'Overdue' => 'danger', 'Draft' => 'neutral'];
    $wrapper = 'overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    $headRow = 'bg-subtle text-left text-sm font-medium text-muted';
    $headCell = 'px-4 py-3 font-medium whitespace-nowrap';
    $row = 'border-t border-line transition-colors duration-150 ease-out hover:bg-subtle/50 motion-reduce:transition-none';
    $cell = 'px-4 py-3 whitespace-nowrap text-ink';
@endphp

<div tabindex="0" role="region" aria-label="Invoices" class="{{ $wrapper }}">
    <table class="w-full border-collapse text-sm">
        <caption class="sr-only">Invoices</caption>
        <thead>
            <tr class="{{ $headRow }}">
                <th scope="col" class="{{ $headCell }} text-left">Invoice</th>
                <th scope="col" class="{{ $headCell }} text-left">Customer</th>
                <th scope="col" class="{{ $headCell }} text-left">Status</th>
                <th scope="col" class="{{ $headCell }} text-right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoices as $invoice)
                <tr class="{{ $row }}">
                    <td class="{{ $cell }} text-left">{{ $invoice['invoice'] }}</td>
                    <td class="{{ $cell }} text-left">{{ $invoice['customer'] }}</td>
                    <td class="{{ $cell }} text-left"><x-markas.badge :variant="$statusVariants[$invoice['status']]">{{ $invoice['status'] }}</x-markas.badge></td>
                    <td class="{{ $cell }} text-right">{{ $invoice['amount'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
