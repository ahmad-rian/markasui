<script setup lang="ts">
import ElasticLine from "../../components/elastic-line/ElasticLine.vue";

const wrap = "grid rounded-xl border border-line bg-surface px-6 py-4";
const section = "py-2";
const title = "text-base font-semibold text-ink";
const text = "mt-1 text-sm text-muted";
</script>

<template>
  <div :class="wrap">
    <section :class="section">
      <h3 :class="title">Release 2.4</h3>
      <p :class="text">Stacking cards, pixel trails, and a faster CLI.</p>
    </section>
    <ElasticLine />
    <section :class="section">
      <h3 :class="title">Release 2.3</h3>
      <p :class="text">Indonesian docs and Rupiah currency input.</p>
    </section>
  </div>
</template>
