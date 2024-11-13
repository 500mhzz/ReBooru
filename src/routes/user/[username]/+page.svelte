<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="@container flex flex-col gap-2 w-full bg-neutral-800/70 text-white p-2">
	<div class="flex flex-row items-center gap-2">
		<img src={data.user.profile?.avatarUrl} alt="" class="max-w-10 rounded-lg">
		<h1 class="text-xl font-semibold">
			@{data.user.username}
		</h1>
		<p class="text-sm text-neutral-400">
			({data.user.id})
		</p>
	</div>

	<div>
		<p>{data.user.profile?.bio || "No bio provided"}</p>
		<p class="text-neutral-400">Created at:
			<span class="text-white">
				{new Date(data.user.createdAt).toLocaleDateString()}
			</span>
		</p>
	</div>
</div>

{#if data.user.posts.length === 0}
	<p>This user hasn't posted anything!</p>
{:else}
	<div class="flex flex-wrap items-center w-full m-2">
		{#each data.user.posts as post}
			<div class="flex flex-col gap-2 bg-neutral-800 text-white p-2 rounded-lg ">
				<h1 class="text-xl font-semibold">{post.title}</h1>
				<img src={post.url[0]} alt="" class="max-w-[15vw] rounded-lg">
			</div>
		{/each}
	</div>
{/if}