<script>
	const { user } = $props();
</script>

<nav class="sticky top-0 flex flex-row items-center justify-between bg-neutral-900 p-3 text-white">
	<div class="flex flex-row items-center gap-3">
		<a href="/">Home</a>
		<a href="/posts">Posts</a>
		<a href="/tags">Tags</a>
		<a href="/users">Users</a>
		<a href="/about">About</a>
	</div>

	<div class="flex flex-row items-center gap-3">
		{#if !user}
			<a href="/auth/signup">Sign Up</a>
			<a href="/auth/login">Login</a>
		{:else}
			<form action="/auth/logout/?/logout" method="post">
				<button type="submit" class="rounded-lg bg-blue-500 px-5 py-2 hover:bg-blue-500/85"
					>Logout</button
				>
			</form>
		{/if}
	</div>
</nav>
