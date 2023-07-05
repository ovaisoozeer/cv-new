import { getPageBlocks } from '$lib/api-helpers';

export const ssr = false;

export async function load() {
	return {
		blocks: await getPageBlocks('home')
	};
}
