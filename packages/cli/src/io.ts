import { createInterface } from "node:readline/promises";

export type Io = {
  log: (message: string) => void;
  warn: (message: string) => void;
  /** Bertanya ya/tidak. Mengembalikan null kalau tidak interaktif (CI, pipe). */
  confirm: (question: string) => Promise<boolean | null>;
};

export const terminalIo: Io = {
  log: (message) => console.log(message),
  warn: (message) => console.warn(message),
  async confirm(question) {
    if (!process.stdin.isTTY) return null;
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    try {
      const answer = await rl.question(`${question} (y/N) `);
      return /^y(a|es)?$/i.test(answer.trim());
    } finally {
      rl.close();
    }
  },
};
