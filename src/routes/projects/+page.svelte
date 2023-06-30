<script>
	import { each } from 'svelte/internal';

	export let data;
</script>

<table>
	<tr>
		<th>Solution</th>
		<th>Role</th>
		<th>Client</th>
		<th>Experience</th>
	</tr>
	{#each data.rows as row}
		<tr>
			<td>{@html row.Description}</td>
			<td>{@html row.Role}</td>
			<td>{@html row.Client}</td>
			<td>{@html row.Achievement}</td>
		</tr>
	{/each}
</table>
