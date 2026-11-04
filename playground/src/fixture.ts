export const fixtureName = (): string =>
  new URLSearchParams(location.search).get("c") ?? "button";

export const fixtureRoot = (): HTMLElement => {
  const element = document.getElementById("fixture");
  if (!element) throw new Error("Elemen #fixture tidak ditemukan");
  return element;
};

/** Ditunggu oleh Playwright sebelum mengambil screenshot. */
export const markReady = (): void => {
  requestAnimationFrame(() => {
    document.body.dataset.ready = "true";
  });
};

export const missingFixture = (framework: string, name: string): never => {
  throw new Error(`Fixture ${framework} untuk "${name}" tidak ada`);
};
