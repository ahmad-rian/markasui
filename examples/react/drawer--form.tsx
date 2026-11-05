import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";
import { Input } from "../../components/input/Input";

export default function DrawerFormExample() {
  return (
    <div className="flex justify-center">
      <Drawer
        title="Edit profile"
        trigger={<Button>Edit profile</Button>}
        footer={
          <>
            <Button variant="secondary" type="submit" value="cancel">
              Cancel
            </Button>
            <Button type="submit" value="save">
              Save changes
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input
            name="profile-name"
            label="Display name"
            placeholder="Budi Santoso"
          />
          <Input
            name="profile-role"
            label="Job title"
            placeholder="Product designer"
          />
          <Input
            name="profile-website"
            type="url"
            label="Website"
            placeholder="https://example.com"
          />
        </div>
      </Drawer>
    </div>
  );
}
