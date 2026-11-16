<script lang="ts" module>
  export type NavigationMenuLink = {
    label: string;
    href: string;
    description?: string;
    /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
    icon?: string;
  };

  export type NavigationMenuFeatured = {
    title: string;
    href: string;
    description?: string;
  };

  export type NavigationMenuItem = {
    label: string;
    /** Tujuan link biasa. Diabaikan bila item punya links atau featured. */
    href?: string;
    links?: NavigationMenuLink[];
    featured?: NavigationMenuFeatured;
    /** Tandai halaman atau bagian yang sedang dibuka. */
    active?: boolean;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "relative block max-w-full overflow-x-auto p-1 text-sm **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
  const list = "flex items-center gap-1";
  const topItem =
    "group inline-flex h-9 items-center gap-1.5 rounded-md px-3 font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink aria-[current]:text-ink aria-expanded:bg-subtle aria-expanded:text-ink";
  const chevron =
    "size-3.5 text-faint transition-transform duration-200 ease-out group-aria-expanded:rotate-180";
  const indicatorClass =
    "absolute bottom-0 left-0 h-0.5 rounded-full bg-primary opacity-0 transition-[translate,width,opacity] duration-200 ease-out data-[state=visible]:opacity-100";
  const panel =
    "inset-auto m-0 w-[min(40rem,calc(100vw-1rem))] gap-2 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay open:grid transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0";
  const featuredLayout = "sm:grid-cols-[13rem_1fr]";
  const featuredClass =
    "group relative flex min-h-36 flex-col justify-between gap-6 overflow-hidden rounded-lg bg-primary p-4 text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong";
  const featuredArrow =
    "relative size-5 self-end transition-transform duration-150 ease-out group-hover:translate-x-0.5";
  const featuredPattern =
    "absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[12px_12px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]";
  const featuredBody = "relative grid gap-1";
  const featuredTitle = "font-semibold";
  const featuredText = "text-on-primary/75";
  const linkGrid = "grid content-start gap-1 sm:grid-cols-2";
  const panelLink =
    "flex items-start gap-3 rounded-lg p-3 transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle";
  const iconClass =
    "size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]";
  const linkBody = "grid gap-0.5";
  const linkTitle = "font-medium";
  const linkDescription = "text-muted";

  /** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
  const safeHref = (href: string) =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;

  /** Jeda sebelum panel terbuka saat kursor singgah, dan sebelum tertutup saat kursor pergi. */
  const OPEN_DELAY = 120;
  const CLOSE_DELAY = 180;
  /** Jarak panel dari pemicu dan dari tepi layar. */
  const GAP = 8;

  /**
   * Perilaku menu dipasang langsung ke nav (pola yang sama dengan versi Astro): status terbuka
   * dibaca dari DOM lewat aria-expanded, jadi template tetap statis dan bundel tetap kecil.
   */
  function controller(nav: HTMLElement) {
    const list = nav.firstElementChild as HTMLElement;
    const bar = nav.lastElementChild as HTMLElement;
    let timer: ReturnType<typeof setTimeout> | undefined;

    /** Pemicu dan link tingkat atas, berurutan. Panel sebuah pemicu adalah saudara berikutnya. */
    const tops = () =>
      Array.from(
        nav.querySelectorAll<HTMLElement>(":scope > ul > li > :first-child"),
      );

    /** Geser indikator ke panel terbuka atau item aktif, lalu letakkan panel terbuka di bawah pemicunya, rata kiri dengan nav. */
    const sync = () => {
      const all = tops();
      const open = all.findIndex((el) => el.ariaExpanded === "true");
      const active = all.findIndex((el) => el.hasAttribute("aria-current"));
      const target = all[open >= 0 ? open : Math.max(active, 0)];
      if (!target) return;
      bar.style.width = `${target.offsetWidth}px`;
      bar.style.translate = `${target.offsetLeft}px 0`;
      bar.dataset.state = open < 0 && active < 0 ? "hidden" : "visible";
      bar.hidden = false;
      const panel = target.nextElementSibling as HTMLElement | null;
      if (open < 0 || !panel) return;
      const maxLeft = innerWidth - panel.offsetWidth - GAP;
      panel.style.top = `${target.getBoundingClientRect().bottom + GAP}px`;
      panel.style.left = `${Math.max(GAP, Math.min(nav.getBoundingClientRect().left, maxLeft))}px`;
    };

    /** Hover mouse: masuk membuka setelah jeda (langsung bila panel lain terbuka), keluar menutup panel dari hover. */
    const onHover = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(timer);
      const open = nav.querySelector<HTMLElement>("[aria-expanded=true] + *");
      const target =
        event.type === "pointerenter"
          ? (event.currentTarget as Element).querySelector<HTMLElement>(
              "[popover]",
            )
          : null;
      if (target && target === open) return;
      timer = setTimeout(
        () => (target ? target.showPopover() : open?.hidePopover()),
        target ? (open ? 0 : OPEN_DELAY) : CLOSE_DELAY,
      );
    };

    // Link di panel menutup panelnya. Klik mouse pada pemicu yang sudah terbuka (biasanya oleh hover) tidak menutupnya.
    const onClick = (event: MouseEvent) => {
      const element = event.target as Element;
      const panel = element.closest<HTMLElement>("[popover]");
      if (panel) return element.closest("a") && panel.hidePopover();
      clearTimeout(timer);
      if (event.detail && element.closest("[aria-expanded=true]"))
        event.preventDefault();
    };

    // Panah kiri/kanan, Home, dan End berpindah antar item tingkat atas; ArrowDown membuka panel dan memfokuskan link pertama; Escape di panel menutupnya.
    const onKeydown = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement;
      const panel = element.closest<HTMLElement>("[popover]");
      if (panel) {
        if (event.key !== "Escape") return;
        panel.hidePopover();
        return (panel.previousElementSibling as HTMLElement).focus();
      }
      const all = tops();
      const current = all.indexOf(element);
      const own = element.nextElementSibling as HTMLElement | null;
      const moves: Record<string, number | undefined> = {
        ArrowRight: current + 1,
        ArrowLeft: current - 1,
        Home: 0,
        End: -1,
      };
      const target = moves[event.key];
      if (target === undefined && (event.key !== "ArrowDown" || !own)) return;
      event.preventDefault();
      if (target !== undefined) return all.at(target % all.length)?.focus();
      own!.showPopover();
      own!.querySelector("a")?.focus();
    };

    // Fokus keluar dari entri (pemicu dan panelnya) menutup panel.
    const onFocusout = (event: FocusEvent) => {
      const element = event.target as Element;
      const panel = (element.closest("[popover]") ??
        element.nextElementSibling) as HTMLElement | null;
      const next = event.relatedTarget as Node | null;
      if (next && panel && !panel.parentElement?.contains(next))
        panel.hidePopover();
    };

    // beforetoggle tidak bubble dan berjalan sinkron: dengarkan di fase capture, posisi diatur setelah status berubah.
    const onBeforeToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === "open";
      (event.target as Element).previousElementSibling?.setAttribute(
        "aria-expanded",
        `${open}`,
      );
      // Event toggle baru datang di task berikutnya; atur posisi sebelum frame pertama panel dilukis.
      if (open) requestAnimationFrame(sync);
    };

    // Indikator dan panel terbuka mengikuti perubahan, gulir, ukuran jendela, dan font yang selesai dimuat.
    const listeners: [EventTarget, string, EventListener, boolean?][] = [
      [list, "keydown", onKeydown as EventListener],
      [list, "click", onClick as EventListener],
      [list, "focusout", onFocusout as EventListener],
      [nav, "beforetoggle", onBeforeToggle, true],
      [nav, "toggle", sync, true],
      [window, "scroll", sync, true],
      [window, "resize", sync],
      ...Array.from(list.children).flatMap((li) =>
        ["pointerenter", "pointerleave"].map(
          (type): [EventTarget, string, EventListener] => [
            li,
            type,
            onHover as EventListener,
          ],
        ),
      ),
    ];
    for (const [target, type, fn, capture] of listeners)
      target.addEventListener(type, fn, capture);
    sync();
    document.fonts?.ready.then(sync);
    return () => {
      clearTimeout(timer);
      for (const [target, type, fn, capture] of listeners)
        target.removeEventListener(type, fn, capture);
    };
  }

  type Props = HTMLAttributes<HTMLElement> & {
    items: NavigationMenuItem[];
    /** Accessible name of the nav element (aria-label). */
    navLabel?: string;
  };

  let {
    items,
    navLabel = "Main",
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const baseId = $derived(id ?? generatedId);
</script>

{#snippet icon(path: string, className: string)}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
{/snippet}

<nav
  {@attach (node) => {
    void items;
    return controller(node);
  }}
  id={baseId}
  aria-label={navLabel}
  class={[root, className]}
  {...rest}
>
  <ul class={list}>
    {#each items as item, index}
      {@const panelId = `${baseId}-panel-${index}`}
      <li>
        {#if item.links?.length || item.featured}
          <button
            type="button"
            popovertarget={panelId}
            aria-expanded="false"
            aria-controls={panelId}
            aria-current={item.active ? "true" : undefined}
            class={topItem}
          >
            <span>{item.label}</span>
            {@render icon("m6 9 6 6 6-6", chevron)}
          </button>
          <div
            id={panelId}
            popover="auto"
            class={[panel, item.featured && featuredLayout]}
          >
            {#if item.featured}
              <a href={safeHref(item.featured.href)} class={featuredClass}>
                <span aria-hidden="true" class={featuredPattern}></span>
                {@render icon("M5 12h14m-6-6 6 6-6 6", featuredArrow)}
                <span class={featuredBody}>
                  <span class={featuredTitle}>{item.featured.title}</span>
                  {#if item.featured.description}
                    <span class={featuredText}>{item.featured.description}</span
                    >
                  {/if}
                </span>
              </a>
            {/if}
            {#if item.links?.length}
              <ul class={linkGrid}>
                {#each item.links as link}
                  <li>
                    <a href={safeHref(link.href)} class={panelLink}>
                      {#if link.icon}
                        {@render icon(link.icon, iconClass)}
                      {/if}
                      <span class={linkBody}>
                        <span class={linkTitle}>{link.label}</span>
                        {#if link.description}
                          <span class={linkDescription}>{link.description}</span
                          >
                        {/if}
                      </span>
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {:else}
          <a
            href={safeHref(item.href ?? "#")}
            aria-current={item.active ? "page" : undefined}
            class={topItem}>{item.label}</a
          >
        {/if}
      </li>
    {/each}
  </ul>
  <span aria-hidden="true" data-state="hidden" hidden class={indicatorClass}
  ></span>
</nav>
