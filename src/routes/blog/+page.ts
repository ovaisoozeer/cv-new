import { getBlogArticles } from '$lib/api-helpers';

export const ssr = false;

export async function load() {
	const blogArticles = await getBlogArticles();

	console.log('glovv', blogArticles);
	return {
		articles: blogArticles
	};
}
