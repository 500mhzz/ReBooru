<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children, data } = $props();
</script>

<div>
	<Navbar userData={data.user} />
	<main>
		{@render children()}
	</main>
</div>
