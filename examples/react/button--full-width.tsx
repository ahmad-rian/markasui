import { Button } from "../../components/button/Button";

export default function ButtonFullWidthExample() {
  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <Button className="w-full">Create account</Button>
      <Button variant="secondary" className="w-full">
        Continue with email
      </Button>
    </div>
  );
}
