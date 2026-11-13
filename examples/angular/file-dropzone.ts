import { Component } from "@angular/core";
import { FileDropzone } from "../../components/file-dropzone/file-dropzone.component";

@Component({
  selector: "markas-example",
  imports: [FileDropzone],
  template: `
    <markas-file-dropzone
      name="attachments[]"
      accept="image/*,.pdf"
      multiple
      [maxSize]="5242880"
      [maxFiles]="4"
      hint="Images or PDF, up to 5 MB each"
      [files]="files"
    />
  `,
})
export default class FileDropzoneExample {
  protected readonly files = [
    {
      name: "brand-guidelines.pdf",
      size: 2457600,
      type: "application/pdf",
      progress: 100,
    },
    { name: "hero-photo.jpg", size: 1153434, type: "image/jpeg", progress: 64 },
    {
      name: "launch-video.mov",
      size: 48234496,
      type: "video/quicktime",
      error: "Larger than 5 MB",
    },
  ];
}
