<script lang="ts">
  import Screensaver from "../../components/screensaver/Screensaver.svelte";

  const banner = "h-16 rounded-xl bg-primary text-on-primary";
  const label =
    "flex items-center gap-2 px-1 py-1 text-sm font-semibold whitespace-nowrap";
  const icon = "size-5";
</script>

<Screensaver effect="none" speed={45} pauseOnHover={false} class={banner}>
  <span class={label}
    ><svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class={icon}
    >
      <path d="M12 15c-1.5 0-3-1.5-3-3 0-4 3-8 3-8s3 4 3 8c0 1.5-1.5 3-3 3Z"
      ></path>
      <path d="M9 13l-3 2 1 3 3-1"></path>
      <path d="M15 13l3 2-1 3-3-1"></path></svg
    >Launching 17 August</span
  >
</Screensaver>
