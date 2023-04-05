<script>
    import { onMount } from 'svelte';
    import moment from 'moment';
    import Text from '$lib/components/consoletext.svelte';
    import io from '$lib/js/webSocketConnection.js'; 

    export let id;
    export let name;
    export let pid;

    let consoleElement, commandInput;

    onMount(() => {
        io.emit(`console-${id}-connect`);
    });

    io.on(`console-${id}-connected`, (data) => {
        if(data.logs) {
            data.logs.forEach((message) => {
                new Text({
                    target: consoleElement,
                    props: {
                        message: message.text, 
                        type: message.type
                    }
                });
            });
        }
        if(data.pid) pid = data.pid;
    });

    io.on(`console-${id}-serverMessage`, (data) => {
        new Text({
            target: consoleElement,
            props: {
                message: `[${moment().format('LTS')}] - ` + data, 
                type: "warning"
            }
        });
        consoleElement.scrollTop = consoleElement.scrollHeight;
    });

    io.on(`console-${id}-start`, (data) => {
        pid = data;
        new Text({
            target: consoleElement,
            props: {
                message: `[${moment().format('LTS')}] - ` + "Starting process...", 
                type: "success"
            }
        });
        consoleElement.scrollTop = consoleElement.scrollHeight;
    });

    io.on(`console-${id}-message`, (data) => {
        new Text({
            target: consoleElement,
            props: {
                message: `[${moment().format('LTS')}] - ` + data
            }
        });
        consoleElement.scrollTop = consoleElement.scrollHeight;
    });

    io.on(`console-${id}-exit`, (data) => {
        pid = null;
        new Text({
            target: consoleElement,
            props: {
                message: `[${moment().format('LTS')}] - ` + data, 
                type: "error"
            }
        });
        consoleElement.scrollTop = consoleElement.scrollHeight;
    });

    function sendCommand() {
        if(commandInput.value && commandInput.value.length > 0) {
            io.emit(`console-${id}-command`, commandInput.value);
            commandInput.value = "";
        }
    }

</script>


<div class="parent-console">
    <div class="console">
        <div class="console-text" bind:this={consoleElement}>
            <p class="primary"><b>ID:</b> {id}</p>
            <p class="primary"><b>Server:</b> {name}</p>
            <p class="primary"><b>PID:</b> <code>{pid || "none"}</code></p>
            <br>
        </div>
	<!--
        <div class="console-input">
            <input bind:this={commandInput} type="text" placeholder="Command"/>
            <button on:click={sendCommand}>Send</button>
        </div>
	-->
    </div>
</div>