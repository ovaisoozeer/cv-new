<script>
	export let data;
</script>

<h1 class="text-3xl font-bold underline">{data.title}</h1>

{#each data.blocks as block}
	{#if block.blockType === 'h1'}
		<h2 class="text-3xl">{block.text}</h2>
	{:else if block.blockType === 'h2'}
		<h2 class="text-2xl">{block.text}</h2>
	{:else if block.blockType === 'p'}
		<p class="text-base">{block.text}</p>
	{/if}
{/each}
