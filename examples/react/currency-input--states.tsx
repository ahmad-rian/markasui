import { CurrencyInput } from "../../components/currency-input/CurrencyInput";

const stack = "grid gap-5";

export default function CurrencyInputStatesExample() {
  return (
    <div className={stack}>
      <CurrencyInput
        label="Transfer amount"
        error="Amount exceeds your daily limit of Rp5.000.000"
        defaultValue={7500000}
      />
      <CurrencyInput label="Admin fee" defaultValue={2500} disabled />
      <CurrencyInput label="Opening balance" placeholder="0" />
    </div>
  );
}
