<script lang="ts">
	import { page } from '$app/stores';
	let tags: string = '';
	let tagsArray: string[] = [];

	function addTag() {
		const newTags = tags
			.split(/[\s,]+/)
			.filter((tag) => tag.length > 0 && /^[a-zA-Z0-9_-]+$/.test(tag));
		tagsArray = [...tagsArray, ...newTags];
		tags = '';
	}

	function removeTag(index: number) {
		tagsArray = tagsArray.filter((_, i) => i !== index);
	}

	$: tagsArray = tagsArray.filter((tag) => /^[a-zA-Z0-9_-]+$/.test(tag));
</script>

{#if $page.url.searchParams.get('message')}
	<div class="m-2 rounded-lg bg-red-500/50 p-3 text-center">
		<p>{$page.url.searchParams.get('message')}</p>
	</div>
{/if}

<form
	method="post"
	class="mx-auto flex w-full max-w-md flex-col gap-3 rounded-lg bg-neutral-900 p-3"
	enctype="multipart/form-data"
>
	<input
		type="text"
		name="content"
		placeholder="Description"
		class="rounded-lg bg-neutral-700 p-2"
		required
	/>
	<input
		type="text"
		name="tags"
		placeholder="Tags (comma or space separated)"
		class="rounded-lg bg-neutral-700 p-2"
		bind:value={tags}
		on:keydown={(e) =>
			(e.key === 'Enter' || e.key === ' ' || e.key === ',') && (e.preventDefault(), addTag())}
	/>

	<div class="mt-2 flex flex-wrap gap-2">
		{#each tagsArray as tag, index}
			<button
				type="button"
				class="cursor-pointer rounded bg-neutral-700 px-2 py-1 text-white"
				on:click={() => removeTag(index)}>{tag}</button
			>
		{/each}
	</div>

	<input type="hidden" name="tagsArray" value={tagsArray.join(',')} />

	<input
		type="file"
		name="attachments"
		accept="image/* video/* audio/*"
		class="rounded-lg bg-neutral-700 p-2"
		multiple
		required
	/>

	<button type="submit" class="mt-3 rounded-lg bg-blue-500 py-2 text-center">Create Post</button>
</form>
