import { getArticlesByMaturity } from '$lib/api-helpers';

export const ssr = false;

export async function load({ params }) {
	const articles = await getArticlesByMaturity(params.maturity);

	// console.log(articles);

	return {
		title: params.maturity,
		articles: articles
	};
}
