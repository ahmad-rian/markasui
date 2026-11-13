import { Component } from "@angular/core";
import { FileDropzone } from "../../components/file-dropzone/file-dropzone.component";

@Component({
  selector: "markas-example",
  imports: [FileDropzone],
  template: `
    <div [class]="section">
      <div>
        <p [class]="title">Profile photo</p>
        <p [class]="text">Shown on your profile and next to your comments.</p>
      </div>
      <markas-file-dropzone
        name="avatar"
        accept="image/png,image/jpeg"
        [maxSize]="2097152"
        hint="Square PNG or JPG, up to 2 MB"
        dropLabel="Drop a photo here or"
        browseLabel="choose one"
        [files]="current"
      />
    </div>
  `,
})
export default class FileDropzoneAvatarExample {
  protected readonly section = "grid gap-3";
  protected readonly title = "text-sm font-medium text-ink";
  protected readonly text = "text-sm text-muted";
  protected readonly current = [
    {
      name: "rania-portrait.png",
      size: 482304,
      type: "image/png",
      progress: 100,
    },
  ];
}
