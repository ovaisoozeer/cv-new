import { getArticleByTitle } from '$lib/notion-client-wrapper';
import setApiResponseHeaders from '$lib/server/headers';
import { json } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const pageTitle = url.searchParams.get('title') as string;
	const blockElements = await getArticleByTitle(pageTitle);
	setApiResponseHeaders(setHeaders);
	return json(blockElements);
}
