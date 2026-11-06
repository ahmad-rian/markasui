import { useEffect, useRef, useState } from "react";
import { FileDropzone } from "../../components/file-dropzone/FileDropzone";

/** Simulated upload: +9% every 150ms. A real app reports progress from its upload request. */
const STEP = 9;
const TICK_MS = 150;

const uploads = [
  {
    name: "keynote-deck.pdf",
    size: 5872025,
    type: "application/pdf",
    progress: 100,
  },
  { name: "product-demo.mp4", size: 41943040, type: "video/mp4", progress: 72 },
  { name: "voiceover.wav", size: 9437184, type: "audio/wav", progress: 35 },
];

export default function FileDropzoneUploadingExample() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const started = useRef(new Set<string>());
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearInterval), []);

  const simulate = (files: File[]) => {
    for (const { name } of files) {
      if (started.current.has(name)) continue;
      started.current.add(name);
      let value = 0;
      setProgress((current) => ({ ...current, [name]: value }));
      const timer = window.setInterval(() => {
        value = Math.min(100, value + STEP);
        setProgress((current) => ({ ...current, [name]: value }));
        if (value === 100) clearInterval(timer);
      }, TICK_MS);
      timers.current.push(timer);
    }
  };

  return (
    <FileDropzone
      multiple
      hint="Add a file to watch it upload"
      files={uploads}
      progress={progress}
      onFilesChange={simulate}
    />
  );
}
