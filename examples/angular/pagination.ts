import { Component } from "@angular/core";
import { Pagination } from "../../components/pagination/pagination.component";

@Component({
  selector: "markas-example",
  imports: [Pagination],
  template: `<nav markas-pagination page="5" total="10" [href]="href"></nav>`,
})
export default class PaginationExample {
  protected readonly href = "?p={page}";
}
