<script lang="ts">
	import { writable } from 'svelte/store';

	let tagInput = '';
	let tags = writable<string[]>([]);

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === ',') {
			event.preventDefault();
			if (tagInput.trim()) {
				const formattedTag = tagInput.trim().replace(/\s+/g, '_');
				tags.update(currentTags => [...currentTags, formattedTag]);
				tagInput = '';
			}
		}
	}

	function removeTag(index: number) {
		tags.update(currentTags => currentTags.filter((_, i) => i !== index));
	}
</script>

<div class="flex flex-col items-center justify-center mt-10">
	<form method="post" class="flex flex-col max-w-[20vw] gap-2 bg-neutral-800 p-5 rounded-lg border border-white/10" enctype="multipart/form-data">
		<input type="text" name="title" placeholder="Title" class="bg-neutral-800 rounded-lg border border-white/10" required>
		<textarea name="content" placeholder="Content" class="bg-neutral-800 rounded-lg border border-white/10" required ></textarea>
		<input type="file" name="image" accept="image/*" class="bg-neutral-800 rounded-lg border border-white/10" required >
		<input
			type="text"
			bind:value={tagInput}
			on:keydown={handleKeyPress}
			placeholder="Add tags"
			class="bg-neutral-800 rounded-lg border border-white/10"
		>
		<div class="flex flex-wrap gap-2">
			{#each $tags as tag, index}
				<button type="button" class="tag bg-gray-200 px-2 py-1 rounded-md cursor-pointer" on:click={() => removeTag(index)}>
					{tag}
				</button>
			{/each}
		</div>
		<input type="hidden" name="tags" value={$tags}>
		<button type="submit" class="w-full bg-blue-500 rounded-lg py-3">Submit</button>
	</form>
</div>