<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import Server from '$lib/components/server.svelte';
    import Console from '$lib/components/console.svelte';

    let sideContainer;

</script>

<svelte:head>
	<title>{$page.data.server.name} - {$page.data.id}</title>
</svelte:head>

<div>
    <div bind:this={sideContainer} class="side-container">
        <Server id={$page.data.id} name={$page.data.server.name} pid={$page.data.server.pid} /> 
        <Console id={$page.data.id} name={$page.data.server.name} pid={$page.data.server.pid} />
    </div>
</div>
