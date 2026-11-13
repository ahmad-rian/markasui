<script lang="ts">
  import InputOTP from "../../../components/input-otp/InputOTP.svelte";

  let { oncomplete }: { oncomplete?: (value: string) => void } = $props();
  let code = $state("");
</script>

<InputOTP
  bind:value={code}
  name="code"
  label="Code"
  length={4}
  class="ml-1"
  {oncomplete}
/>
<output>{code || "empty"}</output>
