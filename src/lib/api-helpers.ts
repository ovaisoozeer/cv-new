import type { BlockElement } from './display-types/block-element';
import type { ProjectRow } from './display-types/project-row';

export async function getPageBlocks(title: string): Promise<Array<BlockElement>> {
	const resp = await fetch(`/api/page-elements?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}

export async function getProjectRows(): Promise<Array<ProjectRow>> {
	const resp = await fetch('/api/project-db');
	const rows = resp.json();
	return rows;
}

export async function getBlogArticles(maturity: string): Promise<Array<BlogArticle>> {
	const resp = await fetch(`/api/articles?maturity=${maturity}`);
	const rows = resp.json();
	return rows;
}
