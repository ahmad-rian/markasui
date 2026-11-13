import { Component } from "@angular/core";
import { Accordion } from "../../components/accordion/accordion.component";

@Component({
  selector: "markas-example",
  imports: [Accordion],
  template: `
    <markas-accordion
      [items]="items"
      defaultValue="order"
      class="rounded-xl border bg-surface px-4"
    />
  `,
})
export default class AccordionCardExample {
  protected readonly items = [
    {
      value: "order",
      title: "Order summary",
      content: "3 items, total $86.00 including tax.",
    },
    {
      value: "shipping",
      title: "Shipping address",
      content: "Jl. Merdeka No. 12, Bandung, West Java 40111.",
    },
    {
      value: "payment",
      title: "Payment method",
      content: "Visa ending in 4242, expires 08/28.",
    },
  ];
}
