import { RadioGroup } from "../../components/radio-group/RadioGroup";

const plan = [
  { value: "free", label: "Free", description: "For personal projects." },
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
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function RadioGroupFixture() {
  return (
    <div className="grid gap-6">
      <RadioGroup
        name="plan"
        label="Subscription plan"
        defaultValue="pro"
        options={plan}
      />
      <RadioGroup
        name="billing"
        label="Billing cycle"
        defaultValue="monthly"
        orientation="horizontal"
        options={billing}
      />
    </div>
  );
}
