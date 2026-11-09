<script setup lang="ts">
const css =
  "@keyframes markas-tile-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}";
</script>

<template>
  <footer
    class="@container w-full overflow-hidden rounded-3xl border border-line bg-surface text-sm text-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary"
  >
    <component :is="'style'">{{ css }}</component>
    <div
      class="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4"
    >
      <a
        href="/"
        class="flex items-center gap-2 rounded-md text-base font-semibold"
        ><svg
          class="size-7 shrink-0"
          viewBox="0 0 1464 1430"
          aria-hidden="true"
        >
          <polygon
            class="fill-ink/15"
            points="354,578 1256,138 1171,430 268,868"
          />
          <polygon
            class="fill-ink/50"
            points="553,443 1455,3 1370,295 467,733"
          />
          <polygon
            class="fill-success/30"
            points="421,762 1325,318 1240,611 336,1050"
          />
          <polygon
            class="fill-ink/25"
            points="265,1073 1169,629 1084,922 180,1362"
          />
          <polygon class="fill-ink/75" points="93,965 997,521 912,814 8,1253" />
          <polygon
            class="fill-success"
            points="347,1135 1251,691 1166,984 262,1424"
          /></svg
        >MarkasUI</a
      >
      <nav aria-label="Footer">
        <ul class="flex flex-wrap gap-x-5 gap-y-1 text-muted">
          <li>
            <a
              href="/docs"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Docs</a
            >
          </li>
          <li>
            <a
              href="/components"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Components</a
            >
          </li>
          <li>
            <a
              href="/templates"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Templates</a
            >
          </li>
          <li>
            <a
              href="/changelog"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Changelog</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="grid gap-10 border-b border-line bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-size-[25%_100%] px-5 pt-8"
    >
      <ul
        aria-label="Social media"
        class="flex flex-wrap justify-center gap-x-2 gap-y-3"
      >
        <li>
          <a
            href="https://linkedin.com/company/markasui"
            class="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 font-medium shadow-xs transition-[rotate,translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! hover:bg-subtle motion-reduce:transition-none"
            style="rotate: -6deg"
            ><svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
              /></svg
            >LinkedIn</a
          >
        </li>
        <li>
          <a
            href="mailto:hello@markasui.dev"
            class="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 font-medium shadow-xs transition-[rotate,translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! hover:bg-subtle motion-reduce:transition-none"
            style="rotate: 4deg"
            ><svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6"
              /></svg
            >Email</a
          >
        </li>
        <li>
          <a
            href="https://instagram.com/markasui"
            class="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 font-medium shadow-xs transition-[rotate,translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! hover:bg-subtle motion-reduce:transition-none"
            style="rotate: -3deg"
            ><svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4zM17.5 6.5h.01"
              /></svg
            >Instagram</a
          >
        </li>
        <li>
          <a
            href="https://x.com/markasui"
            class="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 font-medium shadow-xs transition-[rotate,translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! hover:bg-subtle motion-reduce:transition-none"
            style="rotate: 8deg"
            ><svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4"
              /></svg
            >X</a
          >
        </li>
        <li>
          <a
            href="https://x.com/hashtag/BuildWithMarkasUI"
            class="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 font-medium shadow-xs transition-[rotate,translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! hover:bg-subtle motion-reduce:transition-none"
            style="rotate: -5deg"
            ><svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" /></svg
            >BuildWithMarkasUI</a
          >
        </li>
      </ul>
      <div
        aria-hidden="true"
        class="flex items-end justify-center gap-1.5 select-none @xl:gap-3"
      >
        <span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-danger/25 text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: -14deg; translate: 0 4px; animation-delay: 0s"
          >M</span
        ><span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-warning/25 text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: 9deg; translate: 0 -10px; animation-delay: -0.7s"
          >A</span
        ><span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-success/25 text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: -4deg; translate: 0 2px; animation-delay: -1.4s"
          >R</span
        ><span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-primary/10 text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: 16deg; translate: 0 -4px; animation-delay: -2.1s"
          >K</span
        ><span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-[color-mix(in_oklab,var(--color-warning)_22%,var(--color-success)_22%)] text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: -10deg; translate: 0 6px; animation-delay: -2.8s"
          >A</span
        ><span
          class="grid size-12 animate-[markas-tile-bob_4s_ease-in-out_infinite] place-items-center rounded-xl border border-ink/10 bg-danger/15 text-2xl font-black text-ink shadow-xs motion-reduce:animate-none @xl:size-20 @xl:rounded-2xl @xl:text-5xl"
          style="rotate: 6deg; translate: 0 -8px; animation-delay: -3.5s"
          >S</span
        >
      </div>
    </div>
    <a
      href="mailto:hello@markasui.dev"
      class="group flex items-end justify-between gap-4 border-b border-line px-5 py-6 text-[15cqw] leading-[0.9] font-semibold tracking-tighter text-balance transition-colors duration-200 ease-out hover:bg-subtle motion-reduce:transition-none"
      >Get in touch<svg
        class="size-[0.5em] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M7 7h10v10" /></svg
    ></a>
    <div aria-hidden="true" class="flex h-1.5">
      <span class="flex-1 bg-danger/40"></span
      ><span class="flex-1 bg-warning/40"></span
      ><span
        class="flex-1 bg-[color-mix(in_oklab,var(--color-warning)_30%,var(--color-success)_30%)]"
      ></span
      ><span class="flex-1 bg-success/40"></span
      ><span class="flex-1 bg-primary/20"></span
      ><span class="flex-1 bg-danger/25"></span>
    </div>
    <div
      class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 text-xs text-muted"
    >
      <p>© 2026 MarkasUI. UI components for Blade, React, and Vue.</p>
      <nav aria-label="Legal">
        <ul class="flex gap-4">
          <li>
            <a
              href="/privacy"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Privacy</a
            >
          </li>
          <li>
            <a
              href="/terms"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Terms</a
            >
          </li>
          <li>
            <a
              href="/license"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >License</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
