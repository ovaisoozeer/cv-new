import { getPageData } from '$lib/notion_service';

export async function load() {
	let blockElements = await getPageData('home');

	return {
		title: 'Home',
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
