import { Component } from "@angular/core";
import { GithubStarsButton } from "../../components/github-stars-button/github-stars-button.component";

@Component({
  selector: "markas-example",
  imports: [GithubStarsButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <a
        markas-github-stars-button
        href="https://github.com/markasui/markasui"
        [stars]="2310"
        size="sm"
      >
        Star
      </a>
      <a
        markas-github-stars-button
        href="https://github.com/markasui/markasui"
        [stars]="2310"
      >
        Star
      </a>
      <a
        markas-github-stars-button
        href="https://github.com/markasui/markasui"
        [stars]="2310"
        size="lg"
      >
        Star
      </a>
    </div>
  `,
})
export default class GithubStarsButtonSizesExample {}
