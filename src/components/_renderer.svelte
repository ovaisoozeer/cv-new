<script>
	import { RichTextBlock, RichTextBlockType } from '$lib/display-types/rich-text-block';
	import ListItem from './list-item.svelte';

	/**
	 * @type {{ blocks: Array<RichTextBlock>; }}
	 */
	export let data;
</script>

{#each data.blocks as block}
	{#if block.blockType === RichTextBlockType.title}
		<h1 class="text-2xl pt-8 font-extrabold">{@html block.richTextHtmlString}</h1>
	{:else if block.blockType === RichTextBlockType.section}
		<h2 class="text-xl pt-6 font-bold">{@html block.richTextHtmlString}</h2>
	{:else if block.blockType === RichTextBlockType.subsection}
		<h3 class="text-xl pt-5 font-bold">{@html block.richTextHtmlString}</h3>
	{:else if block.blockType === RichTextBlockType.paragraph}
		<p class="text-base pt-4">{@html block.richTextHtmlString}</p>
	{:else if block.blockType === RichTextBlockType.break}
		<br />
	{:else if block.blockType === RichTextBlockType.bullet}
		<ListItem content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.image}
		<img src={block.imageUrl} alt="Sorry, Notion does not support alt-text" class="mx-auto" />
	{/if}
{/each}
