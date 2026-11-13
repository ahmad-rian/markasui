<script lang="ts">
  import Combobox from "../../components/combobox/Combobox.svelte";

  const timezones = [
    { value: "asia-jakarta", label: "Asia/Jakarta (UTC+7)" },
    { value: "asia-makassar", label: "Asia/Makassar (UTC+8)" },
    { value: "asia-jayapura", label: "Asia/Jayapura (UTC+9)" },
    { value: "asia-singapore", label: "Asia/Singapore (UTC+8)" },
    { value: "europe-london", label: "Europe/London (UTC+0)" },
    { value: "america-new-york", label: "America/New_York (UTC-5)" },
  ];
</script>

<Combobox
  name="timezone"
  label="Time zone"
  value="asia-jakarta"
  hint="Used for reminders and report schedules."
  options={timezones}
/>
