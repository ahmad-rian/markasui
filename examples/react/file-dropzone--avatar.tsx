import { FileDropzone } from "../../components/file-dropzone/FileDropzone";

const section = "grid gap-3";
const title = "text-sm font-medium text-ink";
const text = "text-sm text-muted";

const current = [
  {
    name: "rania-portrait.png",
    size: 482304,
    type: "image/png",
    progress: 100,
  },
];

export default function FileDropzoneAvatarExample() {
  return (
    <div className={section}>
      <div>
        <p className={title}>Profile photo</p>
        <p className={text}>Shown on your profile and next to your comments.</p>
      </div>
      <FileDropzone
        name="avatar"
        accept="image/png,image/jpeg"
        maxSize={2097152}
        hint="Square PNG or JPG, up to 2 MB"
        dropLabel="Drop a photo here or"
        browseLabel="choose one"
        files={current}
      />
    </div>
  );
}
