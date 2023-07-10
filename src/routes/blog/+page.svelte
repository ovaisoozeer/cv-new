<script>
	export let data;
</script>

<h1 class="text-2xl pt-8 font-extrabold">Articles</h1>

<ul class="pt-4">
	{#each data.articles as article}
		<li class="p-1"><a href="/articles/{article.TitleText}">{@html article.Title}</a></li>
	{/each}
</ul>
