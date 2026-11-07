<script setup lang="ts">
import LetterSwap from "../../components/letter-swap/LetterSwap.vue";
</script>

<template>
  <footer
    class="grid grid-cols-3 gap-6 rounded-xl border border-line bg-surface p-6 text-sm"
  >
    <div>
      <p class="font-medium text-ink">Company</p>
      <ul class="mt-3 grid gap-2 text-muted">
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="About" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Careers" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Press kit" mode="random"
          /></a>
        </li>
      </ul>
    </div>
    <div>
      <p class="font-medium text-ink">Help</p>
      <ul class="mt-3 grid gap-2 text-muted">
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Contact" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Status" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Terms" mode="random"
          /></a>
        </li>
      </ul>
    </div>
    <div>
      <p class="font-medium text-ink">Social</p>
      <ul class="mt-3 grid gap-2 text-muted">
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="Instagram" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="LinkedIn" mode="random"
          /></a>
        </li>
        <li>
          <a
            href="#"
            class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            ><LetterSwap text="GitHub" mode="random"
          /></a>
        </li>
      </ul>
    </div>
  </footer>
</template>
