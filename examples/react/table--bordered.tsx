import { Table, type TableColumn } from "../../components/table/Table";

const columns: TableColumn[] = [
  { key: "item", label: "Item" },
  { key: "stock", label: "In stock", align: "right" },
  { key: "reserved", label: "Reserved", align: "right" },
  { key: "value", label: "Value", align: "right" },
];
const rows = [
  { item: "Paper A4 80gsm", stock: "420", reserved: "60", value: "$1,890.00" },
  { item: "Ballpoint pen", stock: "1,150", reserved: "200", value: "$575.00" },
  { item: "Stapler", stock: "86", reserved: "12", value: "$688.00" },
  { item: "Sticky notes", stock: "640", reserved: "90", value: "$960.00" },
  { item: "Whiteboard marker", stock: "310", reserved: "45", value: "$465.00" },
];

const footer = {
  item: "Total",
  stock: "2,606",
  reserved: "407",
  value: "$4,578.00",
};

export default function TableBorderedExample() {
  return (
    <Table
      caption="Stock report"
      columns={columns}
      rows={rows}
      bordered
      square
      footer={footer}
    />
  );
}
