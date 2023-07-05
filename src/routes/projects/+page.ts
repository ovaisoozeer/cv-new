import { getProjectRows } from '$lib/api-helpers';

export const ssr = false;

export async function load() {
	const projectRows = await getProjectRows();
	return {
		rows: projectRows.reverse()
	};
}
