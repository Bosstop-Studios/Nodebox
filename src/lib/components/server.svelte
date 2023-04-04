
<script>
    import io from '$lib/js/webSocketConnection.js';

    export let id;
    export let name;
    export let pid;

    io.on(`console-${id}-start`, (data) => pid = data);
    io.on(`console-${id}-exit`, (data) => pid = null);

    io.on(`console-${id}-connected`, (data) => {
        if(data.pid) pid = data.pid;
    });

    let start = () => {
        io.emit('start', { serverId: id, name: name, pid: pid });
    };

    let restart = () => {
        io.emit('restart', { serverId: id, name: name, pid: pid });
    };

    let stop = () => {
        io.emit('stop', { serverId: id, name: name, pid: pid });
    };

</script>

<div class="child">
    <p class="server-name">
        <a data-sveltekit-reload href="/console/{id}">{name}</a>
    </p>
    <p class="space"></p>
    <p class="pid"><code>{pid || "none"}</code></p>
    <p class="btn-group">
        <button on:click={start} class="success">Start</button>
        <button on:click={restart} class="warning">Restart</button>
        <button on:click={stop} class="error">Stop</button>
    </p>
</div>