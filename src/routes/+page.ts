import getPageBlocks from '$lib/page_client';

export const ssr = false;

export async function load() {
	return {
		blocks: structuredClone(await getPageBlocks('home')) //sveltekit does not like types (!)
	};
}
