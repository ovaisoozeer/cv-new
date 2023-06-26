import { getPageData } from '$lib/notion_service';

export async function load({ params }) {
	let pageTitle = params.slug;
	let blockElements = await getPageData(pageTitle);

	return {
		title: pageTitle,
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
