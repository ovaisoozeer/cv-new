import { getPage } from '$lib/api-helpers';

export const ssr = false;

export async function load() {
	return {
		blocks: await getPage('home')
	};
}
