<script lang="ts">
  import InputOTP from "../../components/input-otp/InputOTP.svelte";

  let code = $state("");
</script>

<InputOTP bind:value={code} name="code" label="Verification code" />
