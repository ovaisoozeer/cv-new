<script>
	import RichTextContentBlocks from 'components/_renderer.svelte';

	export let data;
</script>

<h1 class="text-2xl pt-8 font-extrabold">{data.title}</h1>

<RichTextContentBlocks {data} />
