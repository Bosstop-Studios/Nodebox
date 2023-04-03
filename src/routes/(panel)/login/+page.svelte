<script>
    import logo from '$lib/images/nodejs.svg';
    import { goto } from '$app/navigation';

    function login() {
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        if (username.length > 0 && password.length > 0) {
            fetch('/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }).then(res => {

                if(res.status !== 200) alert('Invalid credentials');

                console.log('Logged in');
                redirect("/")

            });
        }
    }

    function redirect(path) {
        goto(path, { replaceState: false });
    }

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
    <div class="card">
        <h1>Nodebox</h1>
        <img src={logo} alt="Nodebox" />
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button on:click={login} type="submit">Login</button>
    </div>
</div>

