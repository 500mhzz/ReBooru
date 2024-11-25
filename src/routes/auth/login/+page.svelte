<script lang="ts">
	import { page } from '$app/stores';

	let email: string = '';
	let password: string = '';

	$: correctInput = email.length > 0 && password.length >= 8;
</script>

{#if $page.url.searchParams.get('message')}
	<div class="m-2 rounded-lg bg-red-500/50 p-3 text-center">
		<p>{$page.url.searchParams.get('message')}</p>
	</div>
{/if}

<div class="flex w-full flex-col items-center justify-center" style="height: calc(100vh - 4.8vh)">
	<form method="post" class="flex w-[25vw] flex-col gap-3 rounded-lg bg-neutral-900 p-3">
		<h1 class="text-center text-2xl font-semibold">Login</h1>

		<input
			type="text"
			name="email"
			placeholder="Email"
			class="rounded-lg bg-neutral-700"
			bind:value={email}
			required
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="rounded-lg bg-neutral-700"
			bind:value={password}
			required
		/>

		<button
			type="submit"
			class="{correctInput ? 'bg-blue-500' : 'bg-neutral-700'} rounded-lg py-2 text-center"
			disabled={!correctInput}
			>Login
		</button>
	</form>
</div>
