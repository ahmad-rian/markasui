declare module "alpinejs" {
  export interface Alpine {
    start(): void;
    initTree(element: HTMLElement): void;
  }
  const Alpine: Alpine;
  export default Alpine;
}
