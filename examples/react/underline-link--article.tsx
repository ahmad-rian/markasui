import { UnderlineLink } from "../../components/underline-link/UnderlineLink";

export default function UnderlineLinkArticleExample() {
  return (
    <article className="text-base leading-relaxed text-muted">
      <h3 className="text-lg font-semibold text-ink">Release notes</h3>
      <p className="mt-2">
        This release adds six text effects. Read the{" "}
        <UnderlineLink
          href="#"
          variant="scribble"
          className="font-medium text-ink"
        >
          migration guide
        </UnderlineLink>{" "}
        before you upgrade, or browse the{" "}
        <UnderlineLink
          href="#"
          variant="goes-out-comes-in"
          className="font-medium text-ink"
        >
          full changelog
        </UnderlineLink>{" "}
        first.
      </p>
    </article>
  );
}
