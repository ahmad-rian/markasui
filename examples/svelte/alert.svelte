<script lang="ts">
  import Alert from "../../components/alert/Alert.svelte";
</script>

<div class="grid gap-3">
  <Alert title="Update available" role="status">
    Version 2.1 can be installed at any time.
  </Alert>
  <Alert variant="success" title="Payment received">
    The invoice has been sent to your email.
  </Alert>
  <Alert variant="warning" title="Quota almost full">
    Only 10% of your storage is left.
  </Alert>
  <Alert variant="danger" title="Could not save">
    Check your internet connection and try again.
  </Alert>
</div>
