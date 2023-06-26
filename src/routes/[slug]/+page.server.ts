import { searchPage } from '$lib/notion-service';

export async function load({ params }) {
	return {
		title: params.slug
	};
}
