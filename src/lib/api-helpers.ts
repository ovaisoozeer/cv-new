import type { BlockElement } from './display-types/block-element';
import type { ProjectRow } from './display-types/project-row';

export async function getPage(title: string): Promise<Array<BlockElement>> {
	const resp = await fetch(`/api/page?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}

export async function getProjectRows(): Promise<Array<ProjectRow>> {
	const resp = await fetch('/api/projects');
	const rows = resp.json();
	return rows;
}

export async function getArticlesByMaturity(maturity: string): Promise<Array<BlogArticle>> {
	const resp = await fetch(`/api/article-list?maturity=${maturity}`);
	const rows = resp.json();
	return rows;
}

export async function getArticleByTitle(title: string): Promise<Array<BlockElement>> {
	const resp = await fetch(`/api/article?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}
