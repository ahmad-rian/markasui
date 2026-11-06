import { Button } from "../../components/button/Button";
import { FileDropzone } from "../../components/file-dropzone/FileDropzone";
import { Input } from "../../components/input/Input";

const form = "grid gap-4";
const field = "grid gap-1.5";
const label = "text-sm font-medium text-ink";
const footer = "flex justify-end";

const attached = [
  {
    name: "campaign-brief.docx",
    size: 88064,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
];

export default function FileDropzoneFormExample() {
  return (
    <form action="#" className={form}>
      <Input name="project" label="Project name" placeholder="Spring launch" />
      <div className={field}>
        <p className={label}>Attachments</p>
        <FileDropzone
          name="attachments[]"
          accept=".pdf,.docx,.zip"
          multiple
          maxFiles={5}
          maxSize={10485760}
          hint="PDF, DOCX, or ZIP, up to 10 MB each"
          files={attached}
        />
      </div>
      <div className={footer}>
        <Button type="submit">Send request</Button>
      </div>
    </form>
  );
}
