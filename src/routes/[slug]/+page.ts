import getPageBlocks from '$lib/page_client';

export const ssr = false;

export async function load({ params }) {
	return {
		blocks: structuredClone(await getPageBlocks(params.slug)) //sveltekit does not like types (!)
	};
}
