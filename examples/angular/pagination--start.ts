import { Component } from "@angular/core";
import { Pagination } from "../../components/pagination/pagination.component";

@Component({
  selector: "markas-example",
  imports: [Pagination],
  template: `<nav markas-pagination page="1" total="10" [href]="href"></nav>`,
})
export default class PaginationStartExample {
  protected readonly href = "?p={page}";
}
