import { onPageLoad } from "./lifecycle";

// Tandai judul yang sedang dibaca. Observer lama diputus setiap pindah halaman.
let observer: IntersectionObserver | undefined;

onPageLoad(() => {
  observer?.disconnect();
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"),
  ];
  if (links.length === 0) return;
  const setActive = (slug: string) =>
    links.forEach((link) =>
      link.toggleAttribute("data-active", link.dataset.tocLink === slug),
    );
  setActive(links[0]!.dataset.tocLink!);
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: "-80px 0px -70% 0px" },
  );
  links.forEach((link) => {
    const target = document.getElementById(link.dataset.tocLink!);
    if (target) observer!.observe(target);
  });
});
