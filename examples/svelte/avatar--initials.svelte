<script lang="ts">
  import Avatar from "../../components/avatar/Avatar.svelte";

  const item = "grid justify-items-center gap-2";
  const caption = "text-xs text-muted";
</script>

<ul class="flex flex-wrap items-start justify-center gap-6">
  <li class={item}>
    <Avatar name="Budi Santoso" size="lg" alt="" />
    <span class={caption}>Budi Santoso</span>
  </li>
  <li class={item}>
    <Avatar name="Ahmad Rian Putra" size="lg" alt="" />
    <span class={caption}>Ahmad Rian Putra</span>
  </li>
  <li class={item}>
    <Avatar name="rina" size="lg" alt="" />
    <span class={caption}>rina</span>
  </li>
  <li class={item}>
    <Avatar name="Maria José García" size="lg" alt="" />
    <span class={caption}>Maria José García</span>
  </li>
</ul>
