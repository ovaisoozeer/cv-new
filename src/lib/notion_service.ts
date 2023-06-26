import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import type {
	GetPageResponse,
	ListBlockChildrenResponse,
	SearchResponse,
	Heading2BlockObjectResponse,
	ParagraphBlockObjectResponse,
	Heading1BlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { BlockElement } from './block_element';

const NOTION_TOKEN = env.NOTION_TOKEN;
const notion = new Client({
	auth: NOTION_TOKEN
});

export async function searchPage(title: string): Promise<SearchResponse> {
	return await notion.search({ query: title });
}

export async function fetchPage(pageId: string): Promise<GetPageResponse> {
	return await notion.pages.retrieve({ page_id: pageId });
}

export async function getRichTextBlocks(blockId: string): Promise<ListBlockChildrenResponse> {
	return await notion.blocks.children.list({
		block_id: blockId,
		page_size: 100
	});
}

export async function getPageData(pageId: string): Promise<Array<BlockElement>> {
	const page = await searchPage(pageId);
	const blocks = await getRichTextBlocks(page.results[0].id);

	console.log('BLOCKS', blocks);

	const blockElements = blocks.results.flatMap((block) => {
		switch (
			block.type //TODO: make typesafe
		) {
			//TODO: handle multiple rich text children
			case 'heading_1':
				let heading1 = new BlockElement();
				heading1.blockType = 'h1';
				heading1.text = (block as Heading1BlockObjectResponse).heading_1.rich_text[0].plain_text;
				return [heading1];
			case 'heading_2':
				let heading2 = new BlockElement();
				heading2.blockType = 'h2';
				heading2.text = (block as Heading2BlockObjectResponse).heading_2.rich_text[0].plain_text;
				return [heading2];
			case 'paragraph':
				let paragraph = new BlockElement();
				paragraph.blockType = 'h2';
				paragraph.text = (block as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text;
				return [paragraph];
			default:
				return []; //using flatMap here to omit elements we don't explicitly want.
		}
	});

	return blockElements;
}
