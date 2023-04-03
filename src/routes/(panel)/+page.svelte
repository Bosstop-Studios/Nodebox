<script>
    import { cookie } from '$lib/js/store.js';
    import { goto } from '$app/navigation';

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
    <h1>{$cookie}</h1>
</section>
