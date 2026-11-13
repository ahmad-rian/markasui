<script lang="ts">
  import Textarea from "../../../components/textarea/Textarea.svelte";

  let value = $state("Hi");
</script>

<Textarea bind:value label="Message" hint="Be kind." class="h-40" />
<output>{value}</output>
