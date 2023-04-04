<script>
    import { onMount } from 'svelte';
    export let message;
    export let type;

    let messageElement, date, text;

    onMount(() => {
        let parseMessage = message.split("-");
        date = parseMessage[0];
        text = parseMessage[1];
        if(type == "error") {
            messageElement.classList.add("error");
        } else if(type == "warning") {
            messageElement.classList.add("warning");
        } else if(type == "success") {
            messageElement.classList.add("success");
        } else if(type == "primary") {
            messageElement.classList.add("primary");
        }
    });
</script>

<div>
    <p>{date}</p>
    <p bind:this={messageElement}>{text}</p>
</div>

<style>
    div {
        margin: 0;
        margin-top: 3.5px !important;
        margin-bottom: 3.5px !important;
        padding: 0;
    }

    p {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
</style>