import { getPublishedArticles } from '$lib/notion_client_wrapper';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	setHeaders({
		'cache-control': 'max-age=0, s-maxage=' + (MAX_AGE || 3600)
	});
	const maturity = url.searchParams.get('maturity') || '';
	const rows = await getPublishedArticles(maturity);
	console.log('rows', rows);
	return json(rows);
}
