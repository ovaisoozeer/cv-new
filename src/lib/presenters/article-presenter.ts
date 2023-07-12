import { ArticleRow } from '$lib/display-types/article-row';
import type { RichTextBlock } from '$lib/display-types/rich-text-block';
import {
	getRichTextHtmlString,
	getRichTextViewModel
} from '$lib/presenters/rich-text-content-factory';
import type {
	ListBlockChildrenResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export async function getArticleListViewModel(maturity: string): Promise<Array<ArticleRow>> {
	const resp = await fetch(`/api/article-list?maturity=${maturity}`);
	const data = await resp.json();
	const articles = data.results.flatMap((row: PageObjectResponse) => {
		if (row.properties['Name'].title.length == 0) {
			return [];
		}
		const rowResult = new ArticleRow();
		rowResult.Title = getRichTextHtmlString((row as PageObjectResponse).properties['Name'].title);
		rowResult.TitleText = (row as PageObjectResponse).properties['Name'].title[0].plain_text;
		return rowResult;
	});
	return articles;
}

export async function getArticleViewModel(title: string): Promise<Array<RichTextBlock>> {
	const resp = await fetch(`/api/article?title=${title}`);
	const data = await resp.json();
	const viewModel = getRichTextViewModel(data as ListBlockChildrenResponse);
	return viewModel;
}
