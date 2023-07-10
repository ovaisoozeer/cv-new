import { getPageBlocks } from '$lib/api-helpers';

export const ssr = false;

export async function load({ params }) {
	return {
		blocks: await getPageBlocks(params.title)
	};
}
