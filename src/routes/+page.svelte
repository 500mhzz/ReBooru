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
		<div class="break-inside">
			<a href="/post/{post.$id}" class="block">
				<img src={post.attachments[0]} alt="" class="w-full h-auto hover:drop-shadow-2xl" />
			</a>
		</div>
	{/each}
</div>

<!--{#if data.user}-->
<!--	<div>-->
<!--		<img src={data.user.avatar} alt="avatar" class="max-w-20 rounded-full">-->
<!--		<h1 class="font-semibold text-xl">{data.user.username} <span class="font-normal text-sm text-neutral-400">({data.user.$id})</span></h1>-->
<!--		<p>Created: {new Date(data.user.createdAt).toLocaleTimeString()} - {new Date(data.user.createdAt).toLocaleDateString()}</p>-->
<!--		<p-->
<!--			class="{data.user.premium ? 'bg-yellow-500/50' : 'bg-neutral-900/35'} w-fit border border-white/10 rounded-full px-5 py-1"-->
<!--		>-->
<!--			{data.user.premium ? "Premium" : "Free"}-->
<!--		</p>-->
<!--	</div>-->
<!--{/if}-->
