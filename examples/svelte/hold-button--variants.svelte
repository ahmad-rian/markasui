<script lang="ts">
  import HoldButton from "../../components/hold-button/HoldButton.svelte";
</script>

<div class="flex flex-wrap items-center justify-center gap-3">
  <HoldButton>Hold to publish</HoldButton>
  <HoldButton variant="secondary">Hold to archive</HoldButton>
  <HoldButton variant="ghost">Hold to reset</HoldButton>
  <HoldButton variant="danger">Hold to delete</HoldButton>
</div>
