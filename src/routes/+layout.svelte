<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="flex flex-row">
	<Sidebar tags={data.tags} post={data.post || null} />
	<div class="w-full">
		<Navbar user={data.user} />
		<main>
			{@render children()}
		</main>
	</div>
</div>
