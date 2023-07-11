import { getArticlesByMaturity } from '$lib/api-helpers';

export const ssr = false;

export async function load({ params }) {
	const blogArticles = await getArticlesByMaturity(params.maturity);

	return {
		title: params.maturity,
		articles: blogArticles
	};
}
