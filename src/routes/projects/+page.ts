import { getProjectRows } from '$lib/page_data_helpers';

export const ssr = false;

export async function load() {
	var projectRows = await getProjectRows('0e8541767ed14a42a56730e7541ee028');
	const data = structuredClone(projectRows.reverse());
	console.log(data);
	return {
		rows: data //svelte does not like types (!)
	};
}
