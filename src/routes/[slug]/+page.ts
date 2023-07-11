import { getPage } from '$lib/api-helpers';

export const ssr = false;

export async function load({ params }) {
	return {
		blocks: await getPage(params.slug)
	};
}
