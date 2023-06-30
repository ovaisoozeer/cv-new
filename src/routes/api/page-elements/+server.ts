import { getPageData } from '$lib/notion_client_wrapper';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const MAX_AGE = env.MAX_AGE;

const testData = [
	{
		blockType: 'h1',
		text: 'Title'
	},
	{
		blockType: 'h2',
		text: 'Header'
	},
	{
		blockType: 'h3',
		text: 'Sub title'
	},
	{
		blockType: 'p',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		blockType: 'bullet',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	}
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET({ url, setHeaders, request }) {
	const pageTitle = url.searchParams.get('pageId') || '';

	setHeaders({
		'cache-control': 'max-age=' + (MAX_AGE || 300)
	});

	if (pageTitle === 'test-data') {
		return json(testData);
	}

	const blockElements = await getPageData(pageTitle);

	return json(blockElements);
}
