import { GithubStarsButton } from "../../components/github-stars-button/GithubStarsButton";

export default function GithubStarsButtonExample() {
  return (
    <div className="flex justify-center">
      <GithubStarsButton
        href="https://github.com/markasui/markasui"
        stars={12480}
      >
        Star on GitHub
      </GithubStarsButton>
    </div>
  );
}
