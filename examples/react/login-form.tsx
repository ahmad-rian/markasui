import { Button } from "../../components/button/Button";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { Input } from "../../components/input/Input";

export default function LoginFormExample() {
  return (
    <form className="grid gap-4" method="POST" action="/login">
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
        label="Password"
        defaultValue="secret"
        error="Password must be at least 8 characters"
        autoComplete="current-password"
      />
      <Checkbox name="remember" label="Remember me on this device" />
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}
