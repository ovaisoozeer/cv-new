<script>
	export let data;
</script>

<table class="table-auto border-solid border-spacing-0 mt-4 mb-4">
	<caption class="caption-top">Projects (outside NDA)</caption>
	<thead class="">
		<tr>
			<th class="border-2">Solution</th>
			<th class="border-2">Role</th>
			<th class="border-2">Client</th>
			<th class="border-2">Experience</th>
		</tr>
	</thead>
	<tbody>
		{#each data.rows as row}
			<tr class="align-text-top">
				<td class="border-2 p-1">{@html row.Description}</td>
				<td class="border-2 p-1">{@html row.Role}</td>
				<td class="border-2 p-1">{@html row.Client}</td>
				<td class="border-2 p-1">{@html row.Achievement}</td>
			</tr>
		{/each}
	</tbody>
</table>
