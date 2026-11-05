import { HoldButton } from "../../components/hold-button/HoldButton";

export default function HoldButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <HoldButton size="sm" duration={1000}>
        Hold 1s
      </HoldButton>
      <HoldButton>Hold 1.5s</HoldButton>
      <HoldButton size="lg" duration={3000}>
        Hold 3s
      </HoldButton>
    </div>
  );
}
