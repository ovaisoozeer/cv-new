import type { BlockElement } from './display_types/block_element';
import type { ProjectRow } from './display_types/project_row';

export async function getPageBlocks(title: string): Promise<Array<BlockElement>> {
	const resp = await fetch(`/api/page-elements?title=${title}`);
	const blockElements = await resp.json();
	return blockElements;
}

export async function getProjectRows(): Promise<Array<ProjectRow>> {
	const resp = await fetch(`/api/project-db`);
	const rows = resp.json();
	return rows;
}
