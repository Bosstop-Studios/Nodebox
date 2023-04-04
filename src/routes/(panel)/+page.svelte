<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import Server from '$lib/components/server.svelte';

    let sideContainer;

    onMount(async () => {
        $page.data.servers.forEach((server) => {
            new Server({
                target: sideContainer,
                props: {
                    id: server.id,
                    name: server.name,
                    pid: server.pid
                }
            });
        });
    });

</script>

<svelte:head>
	<title>Panel</title>
</svelte:head>

<div>
    <div bind:this={sideContainer} class="side-container">
        <div class="child" style="padding:0px;">
            <p class="server-name">Server</p>
            <p class="space"></p>
            <p class="pid">Pid</p>
            <p class="btn-group">Buttons</p>
        </div>
    </div>
</div>
