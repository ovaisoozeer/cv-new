import type { BlockElement } from './block_element';

export default async function getPageBlocks(pageId: string): Promise<BlockElement[]> {
	const resp = await fetch(`/api/page-elements?pageId=${pageId}`);
	const blockElements = await resp.json();
	return blockElements;
}
