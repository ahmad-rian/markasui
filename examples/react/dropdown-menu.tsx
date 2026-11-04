import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Ubah", value: "ubah" },
  { label: "Duplikat", value: "duplikat" },
  { label: "Arsipkan", value: "arsipkan", disabled: true },
  { separator: true as const },
  { label: "Hapus", value: "hapus", danger: true },
];

export default function DropdownMenuFixture() {
  return <DropdownMenu label="Aksi" items={items} />;
}
