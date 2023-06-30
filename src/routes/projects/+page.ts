import { getProjectRows } from '$lib/page_data_helpers';

export const ssr = false;

export async function load() {
	const data = structuredClone(await getProjectRows('0e8541767ed14a42a56730e7541ee028'));
	console.log(data);
	return {
		rows: data //sveltekit does not like types (!)
	};
}
