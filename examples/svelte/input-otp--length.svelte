<script lang="ts">
  import InputOTP from "../../components/input-otp/InputOTP.svelte";

  let pin = $state("");
</script>

<InputOTP bind:value={pin} name="pin" label="Card PIN" length={4} />
