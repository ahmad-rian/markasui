<script lang="ts">
  import TextHighlighter from "../../components/text-highlighter/TextHighlighter.svelte";

  const link =
    "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
</script>

<ul class="grid gap-3 text-base font-medium text-ink">
  <li>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#" class={link}
      ><TextHighlighter trigger="hover" duration={400}
        >Left to right</TextHighlighter
      ></a
    >
  </li>
  <li>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#" class={link}
      ><TextHighlighter
        trigger="hover"
        direction="rtl"
        color="success"
        duration={400}>Right to left</TextHighlighter
      ></a
    >
  </li>
  <li>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#" class={link}
      ><TextHighlighter
        trigger="hover"
        direction="ttb"
        color="danger"
        duration={400}>Top to bottom</TextHighlighter
      ></a
    >
  </li>
  <li>
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#" class={link}
      ><TextHighlighter
        trigger="hover"
        direction="btt"
        color="primary"
        duration={400}>Bottom to top</TextHighlighter
      ></a
    >
  </li>
</ul>
