import { getProjectList } from '$lib/notion-client-wrapper';
import { json } from '@sveltejs/kit';
import setApiResponseHeaders from '$lib/server/headers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const rows = await getProjectList();
	setApiResponseHeaders(setHeaders);
	return json(rows);
}
