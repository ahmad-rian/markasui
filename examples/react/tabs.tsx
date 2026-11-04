import { Tabs } from "../../components/tabs/Tabs";

const items = [
  { value: "akun", label: "Akun", content: "Ubah nama dan email akun Anda." },
  {
    value: "sandi",
    label: "Kata sandi",
    content: "Ganti kata sandi secara berkala.",
  },
  {
    value: "notifikasi",
    label: "Notifikasi",
    content: "Atur email yang ingin Anda terima.",
  },
];

export default function TabsFixture() {
  return <Tabs items={items} defaultValue="akun" />;
}
