
<script>
    import { page } from '$app/stores';
</script>
  
<h1>{$page.status}: {$page.error.message}</h1>

<style>
    h1 {
        font-size: 3rem;
        font-weight: 600;
        text-align: center;
    }
</style>