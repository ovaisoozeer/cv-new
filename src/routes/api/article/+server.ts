import { getArticleContent } from '$lib/notion-client-wrapper';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const pageTitle = url.searchParams.get('title') || '';

	setHeaders({
		'cache-control': 'max-age=0, s-maxage=' + (MAX_AGE || 3600)
	});

	const blockElements = await getArticleContent(pageTitle);

	return json(blockElements);
}
