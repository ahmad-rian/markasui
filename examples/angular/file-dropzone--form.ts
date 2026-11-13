import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { FileDropzone } from "../../components/file-dropzone/file-dropzone.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, FileDropzone, Input],
  template: `
    <form action="#" [class]="form">
      <markas-input
        name="project"
        label="Project name"
        placeholder="Spring launch"
      />
      <div [class]="field">
        <p [class]="label">Attachments</p>
        <markas-file-dropzone
          name="attachments[]"
          accept=".pdf,.docx,.zip"
          multiple
          [maxFiles]="5"
          [maxSize]="10485760"
          hint="PDF, DOCX, or ZIP, up to 10 MB each"
          [files]="attached"
        />
      </div>
      <div [class]="footer">
        <button markas-button type="submit">Send request</button>
      </div>
    </form>
  `,
})
export default class FileDropzoneFormExample {
  protected readonly form = "grid gap-4";
  protected readonly field = "grid gap-1.5";
  protected readonly label = "text-sm font-medium text-ink";
  protected readonly footer = "flex justify-end";
  protected readonly attached = [
    {
      name: "campaign-brief.docx",
      size: 88064,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  ];
}
