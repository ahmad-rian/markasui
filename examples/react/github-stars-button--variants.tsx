import { GithubStarsButton } from "../../components/github-stars-button/GithubStarsButton";

export default function GithubStarsButtonVariantsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={980}
        variant="primary"
      >
        Star
      </GithubStarsButton>
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={980}
      >
        Star
      </GithubStarsButton>
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={980}
        variant="ghost"
      >
        Star
      </GithubStarsButton>
    </div>
  );
}
