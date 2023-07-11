<script>
	import ListItem from 'components/list-item.svelte';

	export let data;
</script>

<h1 class="text-2xl pt-8 font-extrabold">{data.title}</h1>

{#each data.articles as article}
	<ListItem content={article.Title} />
{/each}
