<script>
	export let data;
</script>

<h1 class="text-3xl font-bold underline">home page content</h1>

<ul>
	{#each data.testdata as { slug, title }}
		<li>{title}</li>
	{/each}
</ul>
