import { GithubStarsButton } from "../../components/github-stars-button/GithubStarsButton";

export default function GithubStarsButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={2310}
        size="sm"
      >
        Star
      </GithubStarsButton>
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={2310}
      >
        Star
      </GithubStarsButton>
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={2310}
        size="lg"
      >
        Star
      </GithubStarsButton>
    </div>
  );
}
