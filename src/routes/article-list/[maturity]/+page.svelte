<script>
	import ListItem from 'components/list-item.svelte';
	import Title from 'components/title.svelte';

	export let data;
</script>

<Title content={data.title} />
{#each data.articles as article}
	<ListItem content={article.Title} />
{/each}
