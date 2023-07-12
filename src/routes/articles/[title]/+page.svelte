<script>
	import RichTextContentBlocks from 'components/_renderer.svelte';
	import Title from 'components/title.svelte';

	export let data;
</script>

<Title content={data.title} />
<RichTextContentBlocks {data} />
