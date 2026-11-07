import { TextRotate } from "../../components/text-rotate/TextRotate";

export default function TextRotateExample() {
  return (
    <h2 className="text-3xl font-semibold tracking-tight text-ink">
      Build for{" "}
      <TextRotate words={["Laravel", "React", "Vue"]} className="text-muted" />
    </h2>
  );
}
