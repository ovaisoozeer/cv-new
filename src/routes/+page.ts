import { getPageViewModel } from '$lib/presenters/page-presenter';

export const ssr = false;

export async function load() {
	return {
		blocks: await getPageViewModel('home')
	};
}
