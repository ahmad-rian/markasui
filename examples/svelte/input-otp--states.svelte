<script lang="ts">
  import InputOTP from "../../components/input-otp/InputOTP.svelte";

  let filled = $state("482913");
  let locked = $state("12");
</script>

<div class="grid gap-6">
  <InputOTP bind:value={filled} name="filled_code" label="Filled" />
  <InputOTP bind:value={locked} name="locked_code" label="Disabled" disabled />
</div>
