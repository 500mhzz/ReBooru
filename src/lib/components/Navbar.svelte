<script lang="ts">
	export let userData: typeof import('@prisma/client')['user'];
</script>

<div class="flex flex-row items-center justify-between bg-neutral-800 p-3 text-white">
	<div class="flex flex-row items-center gap-2">
		<img src="/logo.png" alt="" class="w-10">
		<h1 class="text-xl font-bold">ReBooru</h1>
	</div>

	<div class="flex flex-row items-center gap-3">
		<a href="/search">Search</a>
		<a href="/users">Users</a>
		<a href="/tags">Tags</a>
	</div>

	<div class="flex flex-row items-center gap-3">
		{#if userData}
			<a href={`/user/${userData.username}`}>
				<img src={userData.profile.avatarUrl} alt="" class="w-10 rounded-full">
			</a>
		{:else}
			<a href="/auth/login">Login</a>
			<a href="/auth/register">Register</a>
		{/if}
	</div>
</div>