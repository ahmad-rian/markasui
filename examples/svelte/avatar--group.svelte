<script lang="ts">
  import Avatar from "../../components/avatar/Avatar.svelte";

  const photo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='rgb(46 107 58)'/%3E%3Ccircle cx='24' cy='19' r='8' fill='rgb(231 239 229)'/%3E%3Cpath d='M8 46c1-9 8-15 16-15s15 6 16 15z' fill='rgb(231 239 229)'/%3E%3C/svg%3E";
</script>

<div class="flex items-center gap-3">
  <div role="group" aria-label="Project members" class="flex">
    <Avatar name="Dewi Lestari" src={photo} class="ring-2 ring-canvas" />
    <Avatar name="Budi Santoso" class="-ml-2 ring-2 ring-canvas" />
    <Avatar name="Siti Aminah" class="-ml-2 ring-2 ring-canvas" />
    <Avatar name="John Carter" class="-ml-2 ring-2 ring-canvas" />
    <span
      class="-ml-2 inline-flex size-10 items-center justify-center rounded-full bg-subtle text-sm font-medium text-ink ring-2 ring-canvas"
      >+5<span class="sr-only"> more members</span></span
    >
  </div>
  <span class="text-sm text-muted">9 people on this project</span>
</div>
