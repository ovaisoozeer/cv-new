import { getPage } from '$lib/notion-client-wrapper';
import { json } from '@sveltejs/kit';
import setApiResponseHeaders from '$lib/server/headers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const pageTitle = url.searchParams.get('title') as string;
	const blockElements = await getPage(pageTitle);
	setApiResponseHeaders(setHeaders);
	return json(blockElements);
}
