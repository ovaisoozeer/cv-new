import { getPageData } from '$lib/notion_client_wrapper';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const pageTitle = url.searchParams.get('title') || '';

	setHeaders({
		'cache-control': 'max-age=' + (MAX_AGE || 300)
	});

	const blockElements = await getPageData(pageTitle);

	return json(blockElements);
}
