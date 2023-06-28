import { getPageData } from '$lib/notion_service';
import { capitalizeFirstLetter } from '$lib/string_utilities';

const testData = {
	title: 'test data',
	blocks: [
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
	]
};

export async function load({ params }) {
	const pageTitle = params.slug;

	if (pageTitle === 'test-data') {
		return testData;
	}

	const blockElements = await getPageData(pageTitle);

	return {
		title: capitalizeFirstLetter(pageTitle),
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
