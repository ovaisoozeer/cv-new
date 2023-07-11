import { getPageViewModel } from '$lib/presenters/page-presenter';

export const ssr = false;

export async function load({ params }) {
	return {
		blocks: await getPageViewModel(params.slug)
	};
}
