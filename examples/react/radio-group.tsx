import { RadioGroup } from "../../components/radio-group/RadioGroup";

const paket = [
  { value: "gratis", label: "Gratis", description: "Untuk proyek pribadi." },
  {
    value: "pro",
    label: "Pro",
    description: "Untuk tim kecil hingga 10 orang.",
  },
  {
    value: "bisnis",
    label: "Bisnis",
    description: "Untuk organisasi dengan kebutuhan khusus.",
  },
];
const tagihan = [
  { value: "bulanan", label: "Bulanan" },
  { value: "tahunan", label: "Tahunan" },
];

export default function RadioGroupFixture() {
  return (
    <div className="grid gap-6">
      <RadioGroup
        name="paket"
        label="Paket langganan"
        defaultValue="pro"
        options={paket}
      />
      <RadioGroup
        name="tagihan"
        label="Siklus tagihan"
        defaultValue="bulanan"
        orientation="horizontal"
        options={tagihan}
      />
    </div>
  );
}
