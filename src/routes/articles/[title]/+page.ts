import { getArticleViewModel } from '$lib/presenters/article-presenter.js';
import { getPageViewModel } from '$lib/presenters/page-presenter';

export const ssr = false;

export async function load({ params }) {
	return {
		title: params.title,
		blocks: await getArticleViewModel(params.title)
	};
}
