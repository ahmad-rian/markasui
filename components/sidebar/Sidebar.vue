<script setup lang="ts">
import { computed, h, ref, useAttrs, useId, useSlots } from "vue";

export type SidebarItem = {
  label: string;
  /** Tujuan link. Diabaikan bila item punya children. */
  href?: string;
  /** Data path SVG (atribut d) untuk ikon 24x24 bergaris. */
  icon?: string;
  badge?: string | number;
  /** Tandai halaman yang sedang dibuka. */
  active?: boolean;
  disabled?: boolean;
  /** Sub-item. Item induk menjadi tombol buka/tutup. */
  children?: SidebarItem[];
  /** Sub-item terbuka di awal. Default: terbuka bila ada sub-item aktif. */
  open?: boolean;
};

export type SidebarSection = { title?: string; items: SidebarItem[] };

const root = "@container flex overflow-hidden bg-canvas";
const aside =
  "relative hidden w-56 shrink-0 flex-col bg-surface text-sm transition-[width] duration-200 ease-out data-[state=collapsed]:w-16 motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
const variants = {
  default: "border-r border-line",
  floating: "m-2 rounded-xl border border-line",
};
const showAside = { sm: "@sm:flex", md: "@2xl:flex", lg: "@4xl:flex" };
const hideBar = { sm: "@sm:hidden", md: "@2xl:hidden", lg: "@4xl:hidden" };
const headerClass = "flex h-14 shrink-0 items-center border-b border-line px-4";
/** Isi header dan footer dipotong di tepi konten agar rail hanya menampilkan 32px pertama. */
const slotClass =
  "flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap";
const footerClass = "shrink-0 border-t border-line px-4 py-3";
const collapseButton =
  "absolute top-4 -right-3 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:text-ink";
const collapseIcon =
  "size-3.5 transition-transform duration-200 ease-out in-data-[state=collapsed]:rotate-180";
const navClass =
  "min-h-0 flex-1 overflow-y-auto p-3 in-data-[state=collapsed]:overflow-visible";
const listWrap = "relative grid gap-3 [anchor-scope:--active,--hover]";
const indicator =
  "absolute inset-[anchor(--hover_top,anchor(--active_top))_anchor(--hover_right,anchor(--active_right))_anchor(--hover_bottom,anchor(--active_bottom))_anchor(--hover_left,anchor(--active_left))] rounded-md bg-subtle transition-[inset] duration-200 ease-out";
const sectionClass =
  "grid gap-0.5 border-t border-line pt-3 first-of-type:border-t-0 first-of-type:pt-0";
const titleClass =
  "px-2.5 pb-1 text-xs font-medium text-faint in-data-[state=collapsed]:sr-only";
const listClass = "grid gap-0.5";
const item =
  "group/item relative flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] [&:has(+div_[aria-current=page])]:[anchor-name:--active]";
const iconClass = "size-5 shrink-0";
const labelClass = "min-w-0 flex-1 truncate in-data-[state=collapsed]:sr-only";
const badgeClass =
  "rounded-full bg-primary-soft px-1.5 py-0.5 text-xs leading-none font-medium text-primary in-data-[state=collapsed]:sr-only";
const dot =
  "absolute top-1.5 right-1.5 hidden size-2 rounded-full bg-primary in-data-[state=collapsed]:block";
const chevron =
  "size-4 shrink-0 text-faint transition-transform duration-200 ease-out group-aria-expanded/item:rotate-90 in-data-[state=collapsed]:hidden";
const tip =
  "absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-canvas shadow-overlay in-data-[state=collapsed]:group-hover/item:block in-data-[state=collapsed]:group-focus-visible/item:block";
const region =
  "invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=open]:visible data-[state=open]:grid-rows-[1fr] in-data-[state=collapsed]:hidden";
const regionInner = "min-h-0 overflow-hidden";
const subList = "ml-5 grid gap-0.5 border-l border-line py-1 pr-1 pl-2";
const subItem =
  "relative flex h-8 w-full items-center rounded-md px-2.5 text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] in-data-[state=closed]:[anchor-name:none]!";
const content = "flex min-w-0 flex-1 flex-col";
const mobileBar = "flex h-14 shrink-0 items-center border-b border-line px-3";
const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const dialogClass =
  "right-auto left-0 m-0 h-dvh max-h-dvh w-72 flex-col border-r border-line bg-surface p-0 text-sm text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 open:flex starting:open:-translate-x-full motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    sections?: SidebarSection[];
    variant?: keyof typeof variants;
    /** Lebar kontainer minimum agar sidebar tampil di samping konten: sm 24rem, md 42rem, lg 56rem. */
    breakpoint?: keyof typeof showAside;
    id?: string;
    navLabel?: string;
    collapseLabel?: string;
    expandLabel?: string;
    openLabel?: string;
    closeLabel?: string;
  }>(),
  {
    sections: () => [],
    variant: "default",
    breakpoint: "md",
    id: undefined,
    navLabel: "Sidebar",
    collapseLabel: "Collapse sidebar",
    expandLabel: "Expand sidebar",
    openLabel: "Open sidebar",
    closeLabel: "Close sidebar",
  },
);
/** Mode rail ikon. Tanpa v-model state-nya lokal dengan nilai awal dari prop collapsed. */
const collapsed = defineModel<boolean>("collapsed", { default: false });

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". Spasi dan karakter kontrol diabaikan seperti di browser. */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const linkProps = (entry: SidebarItem) =>
  entry.disabled
    ? { role: "link", "aria-disabled": "true" }
    : {
        href: safeHref(entry.href ?? "#"),
        "aria-current": entry.active ? "page" : undefined,
      };

/** Ikon garis 24px dari satu path SVG. */
const Icon = (props: { d: string }) =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
    },
    h("path", { d: props.d }),
  );

const generatedId = useId();
const rootId = computed(() => props.id ?? generatedId);
const dialog = ref<HTMLDialogElement>();
const attrs = useAttrs();
const slots = useSlots();
const groups = ref<Record<string, boolean>>(
  Object.fromEntries(
    props.sections.flatMap((section, s) =>
      section.items.map((entry, i) => [
        `${s}-${i}`,
        entry.open ?? !!entry.children?.some((child) => child.active),
      ]),
    ),
  ),
);

/** Di rail, tombol induk membentangkan sidebar dan membuka grupnya. */
function toggleGroup(key: string, rail: boolean) {
  if (rail) collapsed.value = false;
  groups.value = { ...groups.value, [key]: rail || !groups.value[key] };
}

function onDialogClick(event: MouseEvent) {
  const target = event.target as Element;
  if (target === dialog.value || target.closest("a[href]"))
    dialog.value?.close();
}

/** Nav yang sama dipakai di sidebar desktop (prefix d) dan dialog seluler (prefix m). */
const nav = (prefix: string, rail: boolean) =>
  h(
    "nav",
    { "aria-label": props.navLabel, class: navClass },
    h("div", { class: listWrap }, [
      h("span", { "aria-hidden": "true", class: indicator }),
      ...props.sections.map((section, s) =>
        h("div", { class: sectionClass }, [
          section.title &&
            h("p", { "aria-hidden": "true", class: titleClass }, section.title),
          h(
            "ul",
            { "aria-label": section.title, class: listClass },
            section.items.map((entry, i) => {
              const key = `${s}-${i}`;
              const regionId = `${prefix}-g${key}`;
              const badge = entry.badge != null && entry.badge !== "";
              const body = [
                entry.icon && h(Icon, { d: entry.icon, class: iconClass }),
                h("span", { class: labelClass }, entry.label),
                badge && h("span", { class: badgeClass }, entry.badge),
                badge && h("span", { "aria-hidden": "true", class: dot }),
                !!entry.children?.length &&
                  h(Icon, { d: "m9 6 6 6-6 6", class: chevron }),
                h("span", { "aria-hidden": "true", class: tip }, entry.label),
              ];
              if (!entry.children?.length)
                return h(
                  "li",
                  h("a", { ...linkProps(entry), class: item }, body),
                );
              return h("li", [
                h(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": !!groups.value[key],
                    "aria-controls": regionId,
                    class: item,
                    onClick: () => toggleGroup(key, rail),
                  },
                  body,
                ),
                h(
                  "div",
                  {
                    id: regionId,
                    "data-state": groups.value[key] ? "open" : "closed",
                    class: region,
                  },
                  h(
                    "div",
                    { class: regionInner },
                    h(
                      "ul",
                      { class: subList },
                      entry.children.map((child) =>
                        h(
                          "li",
                          h(
                            "a",
                            { ...linkProps(child), class: subItem },
                            child.label,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ]);
            }),
          ),
        ]),
      ),
    ]),
  );
/** Header atau footer dari slot, dipotong di tepi konten (lihat slotClass). */
const slotBox = (className: string, name: "header" | "footer") =>
  slots[name] &&
  h("div", { class: className }, h("div", { class: slotClass }, slots[name]()));

/**
 * Seluruh markup dirender dengan h(), bukan template, agar bundel tetap di bawah 3 KB gzip.
 * Atribut user (class, data-*, aria-*) jatuh ke elemen root.
 */
const Root = () => {
  const id = rootId.value;
  return h("div", { ...attrs, id, class: [root, attrs.class] }, [
    h(
      "aside",
      {
        id: `${id}-aside`,
        "data-state": collapsed.value ? "collapsed" : "expanded",
        class: [aside, variants[props.variant], showAside[props.breakpoint]],
      },
      [
        slotBox(headerClass, "header"),
        nav(`${id}-d`, collapsed.value),
        slotBox(footerClass, "footer"),
        h(
          "button",
          {
            type: "button",
            "aria-label": collapsed.value
              ? props.expandLabel
              : props.collapseLabel,
            "aria-expanded": !collapsed.value,
            "aria-controls": `${id}-aside`,
            class: collapseButton,
            onClick: () => (collapsed.value = !collapsed.value),
          },
          h(Icon, { d: "m15 6-6 6 6 6", class: collapseIcon }),
        ),
      ],
    ),
    h(
      "dialog",
      {
        id: `${id}-dialog`,
        ref: dialog,
        "aria-label": props.navLabel,
        class: dialogClass,
        onClick: onDialogClick,
      },
      [
        h("div", { class: headerClass }, [
          h("div", { class: slotClass }, slots.header?.()),
          h(
            "form",
            { method: "dialog" },
            h(
              "button",
              {
                type: "submit",
                "aria-label": props.closeLabel,
                class: iconButton,
              },
              h(Icon, { d: "M18 6 6 18M6 6l12 12", class: iconClass }),
            ),
          ),
        ]),
        nav(`${id}-m`, false),
        slotBox(footerClass, "footer"),
      ],
    ),
    h("div", { class: content }, [
      h(
        "div",
        { class: [mobileBar, hideBar[props.breakpoint]] },
        h(
          "button",
          {
            type: "button",
            "aria-label": props.openLabel,
            "aria-haspopup": "dialog",
            "aria-controls": `${id}-dialog`,
            class: iconButton,
            onClick: () => dialog.value?.showModal(),
          },
          h(Icon, { d: "M4 6h16M4 12h16M4 18h16", class: iconClass }),
        ),
      ),
      slots.default?.(),
    ]),
  ]);
};
</script>

<template>
  <Root />
</template>
