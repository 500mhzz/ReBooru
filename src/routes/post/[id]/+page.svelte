<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	const { data, form } = $page;
	let scrollPosition = 0;

	$effect.pre(() => {
		scrollPosition = window.scrollY;
	});

	$effect(() => {
		window.scrollTo(0, scrollPosition);
	});

	function formatTimestamp(timestamp: string) {
		return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
	}
</script>

{#if form?.message}
	<div class="m-2 rounded-lg bg-red-500/50 p-3 text-center">
		<p>{form.message}</p>
	</div>
{/if}

<div class="flex justify-center">
	<div class="w-[50%] mt-5">
		<div class="bg-red-400/30 p-1 text-center">
			Image resized to 50% width
		</div>
		{#if data.post}
			{#each data.post.attachments as attachment}
				<img src={attachment} alt="" class="h-auto" />
			{/each}

			<div class="bg-neutral-900 p-1">
				<h1 class="text-xl font-semibold">Artist Message:</h1>
				{data.post.content}
			</div>

			<div class="flex flex-col gap-2">
				<form action="?/newComment" method="post" class="flex flex-row gap-2 w-full mt-3">
					<input type="text" name="content" placeholder="Comment" class="bg-neutral-700 p-2 w-full" required />
					<button type="submit" class="bg-blue-500 py-2 px-2 text-center">Comment</button>
				</form>

				{#if !data.post.comments || data.post.comments.length === 0}
					<p class="text-center bg-neutral-700 py-2">No comments yet</p>
				{:else}
					{#each data.post.comments as comment}
						<div class="flex flex-col gap-2 bg-neutral-900 p-1 px-2">
							<div class="flex flex-row items-center gap-2">
								<img src={comment.user.avatar} alt="{comment.user.username}'s avatar" class="max-w-10 max-h-10 mt-1 rounded-sm">
								<div>
									<div class="flex flex-row items-center gap-2">
										<h1 class="font-semibold m-0 p-0">{comment.user.username}</h1>
										<p class="text-sm text-neutral-400">
											{formatTimestamp(comment.$createdAt)}
										</p>
									</div>
									<p class="m-0 p-0">{comment.content}</p>
								</div>
							</div>

							<div class="flex flex-row gap-2 mb-1">
								<form action="?/like" method="post">
									<input type="hidden" name="commentId" value={comment.$id} />
									<button type="submit" class="flex flex-row items-center text-blue-500 bg-neutral-800 gap-1 py-1 px-3 text-center">
										<Icon icon='mdi:thumb-up' class="w-5 h-5" />
										{comment.likes.length}
									</button>
								</form>

								<form action="?/dislike" method="post">
									<input type="hidden" name="commentId" value={comment.$id} />
									<button type="submit" class="flex flex-row items-center gap-1 text-red-500 bg-neutral-800 py-1 px-3 text-center">
										<Icon icon="mdi:dislike-outline" class="w-5 h-5" />
										{comment.dislikes.length}
									</button>
								</form>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>