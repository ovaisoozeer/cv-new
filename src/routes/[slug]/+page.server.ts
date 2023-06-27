import { getPageData } from '$lib/notion_service';
import { capitalizeFirstLetter } from '$lib/string_utilities';

export async function load({ params }) {
	let pageTitle = params.slug;
	let blockElements = await getPageData(pageTitle);

	return {
		title: capitalizeFirstLetter(pageTitle),
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
