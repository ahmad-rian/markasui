import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Tabs } from "../../components/tabs/Tabs";

const items = [
  {
    value: "profile",
    label: "Profile",
    content: (
      <div className="grid gap-4">
        <Input name="name" label="Name" defaultValue="Siti Aminah" />
        <Input
          name="email"
          type="email"
          label="Email"
          defaultValue="siti@example.com"
        />
        <div>
          <Button>Save changes</Button>
        </div>
      </div>
    ),
  },
  {
    value: "password",
    label: "Password",
    content: (
      <div className="grid gap-4">
        <Input
          name="current-password"
          type="password"
          label="Current password"
        />
        <Input
          name="new-password"
          type="password"
          label="New password"
          hint="At least 8 characters"
        />
        <div>
          <Button>Update password</Button>
        </div>
      </div>
    ),
  },
];

export default function TabsFormExample() {
  return <Tabs items={items} defaultValue="profile" />;
}
