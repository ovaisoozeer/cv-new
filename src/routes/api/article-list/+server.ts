import { getArticleListByMaturity } from '$lib/notion-client-wrapper';
import { json } from '@sveltejs/kit';
import setApiResponseHeaders from '$lib/server/headers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const maturity = url.searchParams.get('maturity') as string;
	const rows = await getArticleListByMaturity(maturity);
	setApiResponseHeaders(setHeaders);
	return json(rows);
}
