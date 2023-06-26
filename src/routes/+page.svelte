<script>
	import { HtmlTag } from 'svelte/internal';
	export let data;
</script>

<h1 class="text-3xl font-bold underline">{data.title}</h1>

{#each data.blocks as block}
	{#if block.type === 'h2'}
		<h2 class="text-2xl">{block.content}</h2>
	{/if}
	{#if block.type === 'p'}
		<p class="text-base">{block.content}</p>
	{/if}
{/each}
