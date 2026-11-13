<script lang="ts">
  import Select from "../../components/select/Select.svelte";

  let city = $state("bandung");
  let role = $state("");
  let plan = $state("free");
</script>

<div class="grid gap-4">
  <Select bind:value={city} name="city" label="City" hint="Choose your city.">
    <option value="jakarta">Jakarta</option>
    <option value="bandung">Bandung</option>
    <option value="surabaya">Surabaya</option>
  </Select>
  <Select bind:value={role} name="role" label="Role" error="Role is required.">
    <option value="">Choose a role</option>
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
  </Select>
  <Select bind:value={plan} name="plan" label="Plan" disabled>
    <option value="free">Free</option>
  </Select>
</div>
