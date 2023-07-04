import { getProjectRows } from '$lib/page_data_helpers';

export const ssr = false;

export async function load() {
	const projectRows = await getProjectRows();
	const data = structuredClone(projectRows.reverse());
	console.log(data);
	return {
		rows: data
	};
}
