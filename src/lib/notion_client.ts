import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import type {
	GetPageResponse,
	ListBlockChildrenResponse,
	SearchResponse,
	Heading2BlockObjectResponse,
	ParagraphBlockObjectResponse,
	Heading1BlockObjectResponse,
	Heading3BlockObjectResponse,
	BulletedListItemBlockObjectResponse
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

export async function getPageData(title: string): Promise<Array<BlockElement>> {
	const page = await searchPage(title);
	const blocks = await getRichTextBlocks(page.results[0].id);

	console.log('blocks', blocks);

	// using flatMap here to omit elements we don't explicitly want.
	const blockElements = blocks.results.flatMap((block) => {
		switch (
			block.type // TODO: make typesafe
		) {
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
			case 'heading_3':
				let heading3 = new BlockElement();
				heading3.blockType = 'h3';
				heading3.text = (block as Heading3BlockObjectResponse).heading_3.rich_text[0].plain_text;
				return [heading3];
			case 'paragraph':
				let paragraph = new BlockElement();
				paragraph.blockType = 'p';
				paragraph.text = (block as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text;
				return [paragraph];
			case 'bulleted_list_item':
				let bullet = new BlockElement();
				bullet.blockType = 'bullet';
				bullet.text = (
					block as BulletedListItemBlockObjectResponse
				).bulleted_list_item.rich_text[0].plain_text;
				return [bullet];
			default:
				let empty = new BlockElement();
				empty.blockType = 'br';
				empty.text = '';
				return [];
		}
	});

	return blockElements;
}
