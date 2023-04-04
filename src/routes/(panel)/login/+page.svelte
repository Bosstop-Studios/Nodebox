<script>
    import logo from '$lib/images/nodejs.svg';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
    <div class="card">
        <h1>Nodebox</h1>
        <img src={logo} alt="Nodebox" />
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>
</div>

