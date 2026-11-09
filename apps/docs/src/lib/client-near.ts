import type { ClientDirective } from "astro";

/**
 * client:near: hydrate saat pane framework ([data-fw]) mendekati viewport. client:visible bawaan
 * mengamati anak island, padahal akar banyak contoh berupa display: contents (Modal) yang tidak
 * pernah "terlihat" bagi IntersectionObserver. Pane yang disembunyikan (framework lain) tetap tidak
 * di-hydrate sampai dipilih.
 */
const nearDirective: ClientDirective = (load, _options, el) => {
  const target = el.closest<HTMLElement>("[data-fw]") ?? el.parentElement ?? el;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      void load().then((hydrate) => hydrate());
    },
    { rootMargin: "200px 0px" },
  );
  io.observe(target);
};

export default nearDirective;
