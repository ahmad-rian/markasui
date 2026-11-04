import { Button } from "../../components/button/Button";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Input } from "../../components/input/Input";

export default function LoginFormExample() {
  return (
    <form className="grid gap-4" method="POST" action="/masuk">
      <Input
        name="email"
        type="email"
        label="Email"
        defaultValue="rani@jenderalcorp.com"
        autoComplete="email"
      />
      <Input
        name="password"
        type="password"
        label="Kata sandi"
        defaultValue="rahasia"
        error="Kata sandi minimal 8 karakter."
        autoComplete="current-password"
      />
      <Checkbox name="ingat" label="Ingat saya di perangkat ini" />
      <Button type="submit" className="w-full">
        Masuk
      </Button>
    </form>
  );
}
