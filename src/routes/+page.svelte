<script lang="ts">
	import { page } from '$app/stores';

	const { data } = $props();
</script>

{#if $page.url.searchParams.get('message')}
	<div class="m-2 rounded-lg bg-red-500/50 p-3 text-center">
		<p>{$page.url.searchParams.get('message')}</p>
	</div>
{/if}

<div class="masonry sm:masonry-sm md:masonry-md lg:masonry-lg m-2">
	{#each data.posts.documents as post}
		<div class="break-inside mb-3">
			<a href="/post/{post.$id}" class="block">
				<img src={post.attachments[0]} alt="" class="w-full h-auto hover:drop-shadow-2xl" />
			</a>
		</div>
	{/each}
</div>
