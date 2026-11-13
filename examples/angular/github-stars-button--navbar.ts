import { Component } from "@angular/core";
import { GithubStarsButton } from "../../components/github-stars-button/github-stars-button.component";

@Component({
  selector: "markas-example",
  imports: [GithubStarsButton],
  template: `
    <header
      class="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3"
    >
      <span class="text-base font-semibold text-ink">Markas</span>
      <nav aria-label="Main" class="flex items-center gap-4 text-sm">
        <a href="#docs" class="text-muted hover:text-ink">Docs</a>
        <a href="#blocks" class="text-muted hover:text-ink">Blocks</a>
        <a
          markas-github-stars-button
          href="https://github.com/markasui/markasui"
          [stars]="1240000"
          size="sm"
        >
          Star
        </a>
      </nav>
    </header>
  `,
})
export default class GithubStarsButtonNavbarExample {}
