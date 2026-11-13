<script lang="ts">
  import Badge from "../../components/badge/Badge.svelte";
</script>

<ul
  class="divide-y divide-line rounded-lg border border-line bg-surface text-sm"
>
  <li class="flex items-center justify-between gap-4 px-4 py-3">
    <div class="grid gap-0.5">
      <span class="font-medium text-ink">Invoice #1024</span>
      <span class="text-muted">Due Mar 12</span>
    </div>
    <Badge variant="success">Paid</Badge>
  </li>
  <li class="flex items-center justify-between gap-4 px-4 py-3">
    <div class="grid gap-0.5">
      <span class="font-medium text-ink">Invoice #1025</span>
      <span class="text-muted">Due Mar 28</span>
    </div>
    <Badge variant="warning">Pending</Badge>
  </li>
  <li class="flex items-center justify-between gap-4 px-4 py-3">
    <div class="grid gap-0.5">
      <span class="font-medium text-ink">Invoice #1026</span>
      <span class="text-muted">Due Feb 20</span>
    </div>
    <Badge variant="danger">Overdue</Badge>
  </li>
  <li class="flex items-center justify-between gap-4 px-4 py-3">
    <div class="grid gap-0.5">
      <span class="font-medium text-ink">Invoice #1027</span>
      <span class="text-muted">Not sent yet</span>
    </div>
    <Badge>Draft</Badge>
  </li>
</ul>
