import { getArticleListViewModel } from '$lib/presenters/article-presenter';

export const ssr = false;

export async function load({ params }) {
	const articles = await getArticleListViewModel(params.maturity);

	// console.log(articles);

	return {
		title: params.maturity,
		articles: articles
	};
}
