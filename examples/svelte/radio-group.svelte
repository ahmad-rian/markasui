<script lang="ts">
  import RadioGroup from "../../components/radio-group/RadioGroup.svelte";

  const plan = [
    {
      value: "free",
      label: "Free",
      description: "For personal projects.",
    },
    {
      value: "pro",
      label: "Pro",
      description: "For small teams of up to 10 people.",
    },
    {
      value: "business",
      label: "Business",
      description: "For organizations with custom needs.",
    },
  ];
  const billing = [
    {
      value: "monthly",
      label: "Monthly",
    },
    {
      value: "yearly",
      label: "Yearly",
    },
  ];
</script>

<div class="grid gap-6">
  <RadioGroup
    name="plan"
    label="Subscription plan"
    value="pro"
    options={plan}
  />
  <RadioGroup
    name="billing"
    label="Billing cycle"
    value="monthly"
    orientation="horizontal"
    options={billing}
  />
</div>
