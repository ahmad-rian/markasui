import "@testing-library/jest-dom/vitest";
import { cleanup as cleanupReact } from "@testing-library/react";
import { cleanup as cleanupVue } from "@testing-library/vue";
import { afterEach } from "vitest";

// jsdom belum mengimplementasikan showModal/close sepenuhnya.
if (
  typeof HTMLDialogElement !== "undefined" &&
  !HTMLDialogElement.prototype.showModal
) {
  HTMLDialogElement.prototype.showModal = function showModal(
    this: HTMLDialogElement,
  ) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(
    this: HTMLDialogElement,
    returnValue?: string,
  ) {
    if (returnValue !== undefined) this.returnValue = returnValue;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

afterEach(() => {
  cleanupReact();
  cleanupVue();
});
