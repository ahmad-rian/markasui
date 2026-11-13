<script lang="ts">
  import Pagination from "../../components/pagination/Pagination.svelte";
</script>

<Pagination page={1} total={10} href={"?p={page}"} />
