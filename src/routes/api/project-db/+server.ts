import { getDatabasePages } from '$lib/notion_client_wrapper';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const dbId = url.searchParams.get('dbId') || '';

	// setHeaders({
	// 	'cache-control': 'max-age=' + (MAX_AGE || 300)
	// });

	// if (pageTitle === 'test-data') {
	// 	return json(testData);
	// }

	const rows = await getDatabasePages(dbId);
	return json(rows);
}
