<script lang="ts">
  import Pagination from "../../components/pagination/Pagination.svelte";
</script>

<Pagination page={2} total={4} href={"?p={page}"} />
