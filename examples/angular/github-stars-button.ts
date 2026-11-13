import { Component } from "@angular/core";
import { GithubStarsButton } from "../../components/github-stars-button/github-stars-button.component";

@Component({
  selector: "markas-example",
  imports: [GithubStarsButton],
  template: `
    <div class="flex justify-center">
      <a
        markas-github-stars-button
        href="https://github.com/markasui/markasui"
        [stars]="12480"
      >
        Star on GitHub
      </a>
    </div>
  `,
})
export default class GithubStarsButtonExample {}
