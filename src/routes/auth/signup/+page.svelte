<script lang="ts">
	let password: string = '';
	let passwordConfirm: string = '';

	$: correctPassword =
		password === passwordConfirm && password.length >= 8 && passwordConfirm.length >= 8;
</script>

<div class="flex w-full flex-col items-center justify-center" style="height: calc(100vh - 4.8vh)">
	<form method="post" class="flex w-[25vw] flex-col gap-3 rounded-lg bg-neutral-900 p-3">
		<h1 class="text-center text-2xl font-semibold">Create Account</h1>

		<input
			type="text"
			name="name"
			placeholder="Name"
			class="rounded-lg bg-neutral-700"
			required
			minlength="3"
			maxlength="20"
		/>
		<input
			type="text"
			name="email"
			placeholder="Email"
			class="rounded-lg bg-neutral-700"
			required
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="rounded-lg bg-neutral-700"
			bind:value={password}
			minlength="8"
		/>
		<input
			type="password"
			name="passwordConfirmation"
			placeholder="Confirm Password"
			class="rounded-lg bg-neutral-700"
			bind:value={passwordConfirm}
			required
			minlength="8"
		/>

		<button
			type="submit"
			class="{correctPassword ? 'bg-blue-500' : 'bg-neutral-700'} rounded-lg py-2 text-center"
			disabled={!correctPassword}
			>Sign Up
		</button>
	</form>
</div>
