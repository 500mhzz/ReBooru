<script lang="ts">
	const { data } = $props();
</script>

<div class="flex justify-center">
	<div class="w-[50%] mt-5">
		<div class="bg-red-400/30 p-1 text-center">
			Image resized to 50% width
		</div>
		{#each data.post.attachments as attachment}
			<img src={attachment} alt="" class="h-auto" />
		{/each}

		<div class="bg-neutral-900 p-1">
			<h1 class="text-xl font-semibold">Artist Message:</h1>
			{data.post.content}
		</div>
	</div>
</div>