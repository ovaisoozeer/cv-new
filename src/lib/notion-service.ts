import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import type {
	BlockObjectResponse,
	GetPageResponse,
	ListBlockChildrenResponse,
	SearchResponse
} from '@notionhq/client/build/src/api-endpoints';

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
