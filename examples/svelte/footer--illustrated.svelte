<script lang="ts">
  const css =
    "@keyframes markas-punch{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(-6px,2px) scale(1.06)}}";
</script>

<footer
  class="@container w-full overflow-hidden rounded-3xl border border-line text-sm"
>
  <svelte:element this={"style"}>{css}</svelte:element>
  <div
    class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-surface px-5 py-5 text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary @2xl:px-8"
  >
    <a
      href="/"
      class="flex items-center gap-2 rounded-md text-base font-semibold text-ink"
      ><svg class="size-7 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true">
        <polygon
          class="fill-ink/15"
          points="354,578 1256,138 1171,430 268,868"
        />
        <polygon class="fill-ink/50" points="553,443 1455,3 1370,295 467,733" />
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
    <p>UI components for Blade, React, and Vue.</p>
  </div>
  <div
    class="dark bg-canvas px-5 pt-8 pb-6 text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary @2xl:px-8"
  >
    <div
      class="relative grid overflow-hidden rounded-2xl bg-warning text-on-primary @xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
    >
      <div class="grid content-start justify-items-start gap-4 p-6 @2xl:p-10">
        <h2
          class="text-3xl font-semibold tracking-tight text-balance @2xl:text-5xl"
        >
          Let’s get started.
        </h2>
        <p class="max-w-xs text-base leading-relaxed">
          Tell us what you are building. We reply within one working day.
        </p>
        <a
          href="/contact"
          class="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-on-primary px-5 font-semibold text-warning transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-on-primary! motion-reduce:transition-none"
          >Let’s chat<svg
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
          ></a
        >
      </div>
      <svg
        aria-hidden="true"
        class="-mt-4 w-full max-w-sm self-end justify-self-end @xl:mt-0"
        viewBox="0 0 300 240"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M100 142 70 132 50 146M146 74l-4-30 14-20M250 86l26-18M264 150l30 6M238 200l12 30M118 198l-22 26M196 64l6-34"
        />
        <polygon
          points="120,92 146,74 166,88 196,64 222,90 250,86 242,118 264,150 232,168 238,200 202,190 174,214 150,188 118,198 126,162 100,142 124,120"
          class="fill-on-primary"
        />
        <path
          d="m60 70 10 8-12 6zM270 110l14-4 2 14zM84 196l12-4 2 12zM216 30l12 4-8 10z"
          class="fill-on-primary"
        />
        <g
          class="origin-center animate-[markas-punch_2.4s_ease-in-out_infinite] [transform-box:fill-box] motion-reduce:animate-none"
        >
          <path d="M214 150l70 18v52l-82-18z" class="fill-warning" />
          <path d="M222 166l64 16" />
          <rect
            x="126"
            y="100"
            width="96"
            height="84"
            rx="26"
            class="fill-warning"
          />
          <path d="M150 102v34M174 100v36M198 102v34" />
          <path d="M128 148h46c10 0 16 6 16 16" />
          <path
            d="M146 126c4-6 8-6 12 0M170 126c4-6 8-6 12 0M194 126c4-6 8-6 12 0"
            stroke-width="3"
          />
        </g>
        <path d="M100 112 76 104M96 168l-24 10M110 86 94 70" stroke-width="4" />
      </svg>
    </div>
    <div class="mt-8 flex flex-wrap items-center justify-between gap-6">
      <nav aria-label="Footer">
        <ul class="flex flex-wrap gap-x-5 gap-y-2">
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
              href="/pricing"
              class="rounded-sm transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
              >Pricing</a
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
      <ul aria-label="Social media" class="flex gap-2">
        <li>
          <a
            href="https://github.com/markasui"
            aria-label="GitHub"
            class="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 ease-out hover:border-warning hover:text-warning motion-reduce:transition-none"
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
            ></a
          >
        </li>
        <li>
          <a
            href="https://x.com/markasui"
            aria-label="X"
            class="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 ease-out hover:border-warning hover:text-warning motion-reduce:transition-none"
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
            ></a
          >
        </li>
        <li>
          <a
            href="https://youtube.com/@markasui"
            aria-label="YouTube"
            class="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 ease-out hover:border-warning hover:text-warning motion-reduce:transition-none"
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
            ></a
          >
        </li>
        <li>
          <a
            href="https://linkedin.com/company/markasui"
            aria-label="LinkedIn"
            class="inline-flex size-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 ease-out hover:border-warning hover:text-warning motion-reduce:transition-none"
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
            ></a
          >
        </li>
      </ul>
    </div>
    <p class="mt-6 border-t border-line pt-5 text-xs">
      © 2026 MarkasUI. All rights reserved.
    </p>
  </div>
</footer>
