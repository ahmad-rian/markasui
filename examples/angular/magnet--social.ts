import { Component } from "@angular/core";
import { Magnet } from "../../components/magnet/magnet.component";

@Component({
  selector: "markas-example",
  imports: [Magnet],
  template: `
    <footer [class]="footer">
      <p [class]="text">Follow MarkasUI</p>
      <div [class]="row">
        <markas-magnet [strength]="0.5" [radius]="32"
          ><a href="#" aria-label="Email" [class]="link"
            ><svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              [class]="icon"
            >
              <path d="M4 6h16v12H4z"></path>
              <path d="m4 7 8 6 8-6"></path></svg></a
        ></markas-magnet>
        <markas-magnet [strength]="0.5" [radius]="32"
          ><a href="#" aria-label="Community chat" [class]="link"
            ><svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              [class]="icon"
            >
              <path d="M4 5h16v11H9l-5 4V5Z"></path></svg></a
        ></markas-magnet>
        <markas-magnet [strength]="0.5" [radius]="32"
          ><a href="#" aria-label="Videos" [class]="link"
            ><svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              [class]="icon"
            >
              <path d="M4 6h16v12H4z"></path>
              <path d="m10 9 5 3-5 3V9Z"></path></svg></a
        ></markas-magnet>
        <markas-magnet [strength]="0.5" [radius]="32"
          ><a href="#" aria-label="Website" [class]="link"
            ><svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              [class]="icon"
            >
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
              <path d="M3 12h18"></path>
              <path
                d="M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9Z"
              ></path></svg></a
        ></markas-magnet>
      </div>
    </footer>
  `,
})
export default class MagnetSocialExample {
  protected readonly footer =
    "flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4";
  protected readonly text = "text-sm text-muted";
  protected readonly row = "flex items-center gap-3";
  protected readonly link =
    "grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  protected readonly icon = "size-5";
}
