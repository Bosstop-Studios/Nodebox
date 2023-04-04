
<div>
    <div>
        <div class="sidepanel">
            <h1>Nodebox</h1>
            <p><a data-sveltekit-reload href="/">Servers</a></p>
            <form style="margin:0; padding:0;" action="/auth/logout" method="post">
                <button type="submit">Logout</button>
            </form>
        </div>
        <slot />
    </div>
</div>