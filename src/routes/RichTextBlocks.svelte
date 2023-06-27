<script>
	/**
	 * @type {{ title: any; blocks: any; }}
	 */
	export let data;
</script>

{#each data.blocks as block}
	{#if block.blockType === 'h1'}
		<h1 class="text-2xl pt-8">{block.text}</h1>
	{:else if block.blockType === 'h2'}
		<h2 class="text-xl pt-6">{block.text}</h2>
	{:else if block.blockType === 'h3'}
		<h3 class="text-xl pt-5">{block.text}</h3>
	{:else if block.blockType === 'p'}
		<p class="text-base pt-4">{block.text}</p>
	{:else if block.blockType === 'br'}
		<br />
	{/if}
{/each}
