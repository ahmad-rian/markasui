<script lang="ts">
  import TextHighlighter from "../../../components/text-highlighter/TextHighlighter.svelte";

  let active = $state(false);
  let mark: TextHighlighter | undefined = $state();
</script>

<p>
  Check the
  <TextHighlighter trigger="manual" {active} as="mark" bind:this={mark}
    >title</TextHighlighter
  >.
</p>
<a href="/docs"
  ><TextHighlighter trigger="hover" direction="btt" color="success"
    >Docs</TextHighlighter
  ></a
>
<button type="button" onclick={() => (active = !active)}>Toggle</button>
<button type="button" onclick={() => mark?.animate("rtl")}>Animate</button>
<button type="button" onclick={() => mark?.reset()}>Reset</button>
