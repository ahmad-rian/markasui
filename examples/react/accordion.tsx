import { Accordion } from "../../components/accordion/Accordion";

const items = [
  {
    value: "pengiriman",
    title: "Berapa lama pengiriman?",
    content: "Pesanan tiba dalam 2 sampai 4 hari kerja.",
  },
  {
    value: "pembayaran",
    title: "Metode pembayaran apa saja?",
    content: "Transfer bank, kartu kredit, dan dompet digital.",
  },
  {
    value: "retur",
    title: "Bagaimana cara retur barang?",
    content: "Ajukan retur dalam 7 hari lewat halaman pesanan.",
  },
];

export default function AccordionFixture() {
  return <Accordion items={items} defaultValue="pengiriman" />;
}
