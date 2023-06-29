<script>
	import { BlockElement, BlockType } from '$lib/block_element';

	/**
	 * @type {{ blocks: Array<BlockElement>; }}
	 */
	export let data;
</script>

{#each data.blocks as block}
	{#if block.blockType === BlockType.title}
		<h1 class="text-2xl pt-8">{block.plain_text}</h1>
	{:else if block.blockType === BlockType.section}
		<h2 class="text-xl pt-6">{block.plain_text}</h2>
	{:else if block.blockType === BlockType.subsection}
		<h3 class="text-xl pt-5">{block.plain_text}</h3>
	{:else if block.blockType === BlockType.paragraph}
		<p class="text-base pt-4">{@html block.innerHtml}</p>
	{:else if block.blockType === BlockType.break}
		<br />
	{:else if block.blockType === BlockType.bullet}
		<ul class="list-disc pl-4 pt-1"><li>{block.plain_text}</li></ul>
	{/if}
{/each}
