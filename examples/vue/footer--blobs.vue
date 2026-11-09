<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";

const css =
  "@keyframes markas-blob-spin{to{transform:rotate(360deg)}}@keyframes markas-blob-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}";
</script>

<template>
  <footer
    class="@container w-full overflow-hidden rounded-3xl border border-line bg-surface text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary"
  >
    <component :is="'style'">{{ css }}</component>
    <div class="relative px-4 pt-8 @2xl:px-8">
      <div
        aria-hidden="true"
        class="grid grid-cols-[1fr_1fr_1fr_1.5fr] items-end gap-2 @2xl:gap-5"
      >
        <svg
          class="w-full animate-[markas-blob-float_6s_ease-in-out_infinite] motion-reduce:animate-none"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,8 88,29 88,71 50,92 12,71 12,29"
            class="fill-warning stroke-warning"
            stroke-width="14"
            stroke-linejoin="round"
          /></svg
        ><svg
          class="w-full animate-[markas-blob-spin_28s_linear_infinite] motion-reduce:animate-none"
          viewBox="0 0 100 100"
        >
          <path
            d="M88 50A12.3 12.3 0 0 1 82.9 69A12.3 12.3 0 0 1 69 82.9A12.3 12.3 0 0 1 50 88A12.3 12.3 0 0 1 31 82.9A12.3 12.3 0 0 1 17.1 69A12.3 12.3 0 0 1 12 50A12.3 12.3 0 0 1 17.1 31A12.3 12.3 0 0 1 31 17.1A12.3 12.3 0 0 1 50 12A12.3 12.3 0 0 1 69 17.1A12.3 12.3 0 0 1 82.9 31A12.3 12.3 0 0 1 88 50Z"
            class="fill-danger"
          /></svg
        ><svg
          class="w-full animate-[markas-blob-float_6s_ease-in-out_infinite] [animation-delay:-2s] motion-reduce:animate-none"
          viewBox="0 0 100 100"
        >
          <path
            d="M27 27a23 23 0 1 0 46 0a23 23 0 1 0 -46 0M50 50a23 23 0 1 0 46 0a23 23 0 1 0 -46 0M27 73a23 23 0 1 0 46 0a23 23 0 1 0 -46 0M4 50a23 23 0 1 0 46 0a23 23 0 1 0 -46 0M26 50a24 24 0 1 0 48 0a24 24 0 1 0 -48 0"
            class="fill-success"
          /></svg
        ><svg
          class="w-full animate-[markas-blob-float_6s_ease-in-out_infinite] [animation-delay:-4s] [animation-duration:8s] motion-reduce:animate-none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" class="fill-primary" />
          <circle cx="36" cy="40" r="5" class="fill-on-primary" />
          <circle cx="62" cy="40" r="5" class="fill-on-primary" />
          <path
            d="M36 60c8 8 18 8 26 0"
            fill="none"
            class="stroke-on-primary"
            stroke-width="5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <a
        href="/community"
        class="absolute top-[22%] left-[6%] inline-flex items-center gap-2 rounded-full bg-success px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ink shadow-overlay transition-[rotate,translate] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! motion-reduce:transition-none @xl:px-4 @xl:py-2 @xl:text-sm dark:text-canvas"
        style="rotate: -7deg"
        >Join our community<svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" /></svg></a
      ><a
        href="/newsletter"
        class="absolute right-[5%] bottom-[8%] inline-flex items-center gap-2 rounded-full bg-success px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ink shadow-overlay transition-[rotate,translate] duration-200 ease-out hover:-translate-y-0.5 hover:rotate-0! motion-reduce:transition-none @xl:px-4 @xl:py-2 @xl:text-sm dark:text-canvas"
        style="rotate: 5deg"
        >Sign up for the newsletter<svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" /></svg
      ></a>
    </div>
    <div
      class="grid gap-10 px-4 pt-12 pb-8 @2xl:px-8 @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      <div class="grid content-start gap-5">
        <h2
          class="text-2xl font-semibold tracking-tight text-balance text-ink @2xl:text-3xl"
        >
          Fresh components, once a month.
        </h2>
        <p class="max-w-md leading-relaxed">
          New components, templates, and release notes from the MarkasUI team.
          No spam, unsubscribe anytime.
        </p>
        <form
          action="/newsletter"
          method="post"
          class="flex max-w-md flex-wrap gap-2 [&>div]:min-w-48 [&>div]:flex-1"
        >
          <Input
            type="email"
            name="email"
            required
            autocomplete="email"
            aria-label="Email address"
            placeholder="you@company.com"
            class="h-11! rounded-full! bg-canvas! px-4!"
          /><Button type="submit" class="h-11! rounded-full! px-5!"
            >Sign up</Button
          >
        </form>
        <ul aria-label="Social media" class="flex gap-2">
          <li>
            <a
              href="https://github.com/markasui"
              aria-label="GitHub"
              class="inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-canvas motion-reduce:transition-none"
              ><svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2"
                /></svg
            ></a>
          </li>
          <li>
            <a
              href="https://x.com/markasui"
              aria-label="X"
              class="inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-canvas motion-reduce:transition-none"
              ><svg
                class="size-4"
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
            ></a>
          </li>
          <li>
            <a
              href="https://youtube.com/@markasui"
              aria-label="YouTube"
              class="inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-canvas motion-reduce:transition-none"
              ><svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17M10 15l5-3-5-3z"
                /></svg
            ></a>
          </li>
          <li>
            <a
              href="https://linkedin.com/company/markasui"
              aria-label="LinkedIn"
              class="inline-flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-canvas motion-reduce:transition-none"
              ><svg
                class="size-4"
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
            ></a>
          </li>
        </ul>
      </div>
      <nav
        aria-label="Footer"
        class="grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-3"
      >
        <div>
          <h3 class="font-medium text-ink">Product</h3>
          <ul class="mt-4 grid gap-2.5">
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
                href="/themes"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Themes</a
              >
            </li>
            <li>
              <a
                href="/pricing"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Pricing</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-ink">Resources</h3>
          <ul class="mt-4 grid gap-2.5">
            <li>
              <a
                href="/docs"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Docs</a
              >
            </li>
            <li>
              <a
                href="/changelog"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Changelog</a
              >
            </li>
            <li>
              <a
                href="/docs/mcp"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >MCP server</a
              >
            </li>
            <li>
              <a
                href="/status"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Status</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-ink">Company</h3>
          <ul class="mt-4 grid gap-2.5">
            <li>
              <a
                href="/about"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >About</a
              >
            </li>
            <li>
              <a
                href="/blog"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="/careers"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="/contact"
                class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div
      aria-hidden="true"
      class="h-[0.78em] overflow-hidden px-4 text-[15cqw] leading-none font-semibold tracking-tighter text-ink select-none @2xl:px-8"
    >
      <p class="flex items-center gap-[0.12em]">
        <svg
          class="size-[0.8em] shrink-0"
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
        >MarkasUI
      </p>
    </div>
    <div
      class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line px-4 py-4 text-xs @2xl:px-8"
    >
      <p>© 2026 MarkasUI</p>
      <nav aria-label="Legal">
        <ul class="flex flex-wrap gap-x-4 gap-y-2">
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
          <li>
            <a
              href="/cookies"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Cookies</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
