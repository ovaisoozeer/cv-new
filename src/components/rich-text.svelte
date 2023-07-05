<script>
	import { BlockElement, BlockType } from '$lib/display_types/block_element';

	/**
	 * @type {{ blocks: Array<BlockElement>; }}
	 */
	export let data;
</script>

{#each data.blocks as block}
	{#if block.blockType === BlockType.title}
		<h1 class="text-2xl pt-8">{@html block.richTextHtmlString}</h1>
	{:else if block.blockType === BlockType.section}
		<h2 class="text-xl pt-6">{@html block.richTextHtmlString}</h2>
	{:else if block.blockType === BlockType.subsection}
		<h3 class="text-xl pt-5">{@html block.richTextHtmlString}</h3>
	{:else if block.blockType === BlockType.paragraph}
		<p class="text-base pt-4">{@html block.richTextHtmlString}</p>
	{:else if block.blockType === BlockType.break}
		<br />
	{:else if block.blockType === BlockType.bullet}
		<ul class="list-disc pl-4 pt-1"><li>{@html block.richTextHtmlString}</li></ul>
	{:else if block.blockType === BlockType.image}
		<img src={block.imageUrl} alt="Sorry, Notion does not support alt-text" class="mx-auto" />
	{/if}
{/each}
