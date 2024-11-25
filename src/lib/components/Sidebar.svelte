<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let tags;
	export let post = null;

	function handleSearch(event: any) {
		event.preventDefault();
		const query = event.target.search.value;
		const url = `/search?query=${encodeURIComponent(query)}&sort=score`;
		window.location.href = url;
	}
</script>

<div class="sticky top-0 flex h-screen w-[24rem] flex-col gap-3 bg-neutral-900 p-3 text-white">
	<div class="flex flex-col gap-2">
		<a href="/" class="text-2xl font-semibold text-neutral-300"
		><span class="text-blue-500">Re</span>Board</a
		>
		<form onsubmit={handleSearch} class="flex flex-row gap-1">
			<input
				type="text"
				name="search"
				placeholder="Search Something"
				class="w-full rounded-lg rounded-r-md bg-neutral-800"
				value={$page.url.searchParams.get('query') || ''}
			/>

			<button
				type="submit"
				class="w-fit rounded-lg rounded-l-md bg-blue-500 p-2 px-4 text-white hover:bg-blue-500/85"
			>
				<Icon icon="ic:outline-search" font-size="1.3rem" />
			</button>
		</form>
	</div>

	{#if post}
		<div class="flex flex-col gap-2">
			<h1 class="text-lg font-semibold">Tags</h1>
			<div class="flex flex-col gap-1">
				{#each post.tags as tag}
					<div class="flex flex-row items-center gap-2">
						<a href="/tag/info/${tag.$id}" class="text-lg text-blue-500 hover:underline">?</a>
						<a href="/tag/{tag.$id}" class="text-lg text-blue-500 hover:underline">
							{tag.name}
						</a>
					</div>
				{/each}
			</div>

			<h1 class="text-lg font-semibold">About Post</h1>
			<div class="flex flex-col gap-1">
				<p>
					ID: {post.$id}
				</p>
				<p>
					Created: {new Date(post.createdAt).toLocaleString()}
				</p>
				<p>
					Uploader: <a href="/user/{post.user.$id}" class="text-blue-500 underline">{post.user.username}</a>
				</p>
				<p>
					Likes: {post.likes.length}
				</p>
				<p>
					Dislikes: {post.dislikes.length}
				</p>
			</div>
		</div>
	{/if}
	{#if tags && !post}
		<div class="flex flex-col gap-2">
			<h1 class="text-lg font-semibold">Tags</h1>
			<div class="flex flex-col gap-1">
				{#each tags.documents as tag}
					<div class="flex flex-row items-center gap-2">
						<a href="/tag/info/${tag.$id}" class="text-lg text-blue-500 hover:underline">?</a>
						<a href="/tag/{tag.$id}" class="text-lg text-blue-500 hover:underline">
							{tag.name}
							<span class="text-neutral-500">{tag.posts.length}</span>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
