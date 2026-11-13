<script lang="ts">
  import Pagination from "../../components/pagination/Pagination.svelte";
</script>

<Pagination page={10} total={10} href={"?p={page}"} />
