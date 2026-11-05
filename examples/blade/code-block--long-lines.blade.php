@php
    $code = <<<'CODE'
curl -X POST https://api.example.com/v1/invoices -H "Authorization: Bearer $API_TOKEN" -d '{"customer":"cus_1024","amount":25000}'
CODE;
@endphp

<x-markas.code-block :code="$code" title="create-invoice.sh" show-line-numbers />
