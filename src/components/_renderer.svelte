<script>
	import { RichTextBlock, RichTextBlockType } from '$lib/display-types/rich-text-block';
	import ListItem from './list-item.svelte';
	import Title from './title.svelte';
	import Section from './section.svelte';
	import Subsection from './subsection.svelte';
	import Paragraph from './paragraph.svelte';
	import Image from './image.svelte';

	/**
	 * @type {{ blocks: Array<RichTextBlock>; }}
	 */
	export let data;
</script>

{#each data.blocks as block}
	{#if block.blockType === RichTextBlockType.title}
		<Title content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.section}
		<Section content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.subsection}
		<Subsection content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.paragraph}
		<Paragraph content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.break}
		<br />
	{:else if block.blockType === RichTextBlockType.bullet}
		<ListItem content={block.richTextHtmlString} />
	{:else if block.blockType === RichTextBlockType.image}
		<Image imageUrl={block.imageUrl} />
	{/if}
{/each}
