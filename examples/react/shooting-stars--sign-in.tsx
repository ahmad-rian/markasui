import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { ShootingStars } from "../../components/shooting-stars/ShootingStars";

export default function ShootingStarsSignInExample() {
  return (
    <ShootingStars
      stars={120}
      frequency="low"
      trailColor="success"
      seed={30}
      className="dark rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <form className="mx-auto grid max-w-80 gap-4 rounded-xl border border-line bg-surface p-6">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold text-ink">Night shift login</h3>
          <p className="text-sm text-muted">
            On call this week? Sign in to see open incidents.
          </p>
        </div>
        <Input label="Email" type="email" placeholder="you@company.com" />
        <Input label="Password" type="password" />
        <Button type="submit">Sign in</Button>
      </form>
    </ShootingStars>
  );
}
