<script lang="ts">
  import Skeleton from "../../components/skeleton/Skeleton.svelte";
</script>

<div
  class="flex items-center gap-4 rounded-lg border border-line bg-surface p-4"
  role="status"
>
  <span class="sr-only">Loading profile</span>
  <Skeleton shape="circle" class="size-12 shrink-0" />
  <div class="grid flex-1 gap-2">
    <Skeleton class="h-4 w-2/3" />
    <Skeleton class="h-4 w-1/2" />
  </div>
</div>
