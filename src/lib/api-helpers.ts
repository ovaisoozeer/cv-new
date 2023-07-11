import type { RichTextBlock } from './display-types/rich-text-block';
import type { ProjectRow } from './display-types/project-row';
import type { ArticleRow } from './display-types/article-row';

export async function getPage(title: string): Promise<Array<RichTextBlock>> {
	const resp = await fetch(`/api/page?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}

export async function getProjectRows(): Promise<Array<ProjectRow>> {
	const resp = await fetch('/api/project-list');
	const rows = resp.json();
	return rows;
}

export async function getArticlesByMaturity(maturity: string): Promise<Array<ArticleRow>> {
	const resp = await fetch(`/api/article-list?maturity=${maturity}`);
	const rows = resp.json();
	return rows;
}

export async function getArticleByTitle(title: string): Promise<Array<RichTextBlock>> {
	const resp = await fetch(`/api/article?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}
