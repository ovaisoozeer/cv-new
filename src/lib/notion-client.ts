import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';

const NOTION_TOKEN = env.NOTION_TOKEN;
const notion = new Client({
	auth: NOTION_TOKEN
});

export async function searchPage(title: string) {
	const response = await notion.search({ query: title }).catch((err) => {
		console.error(err);
	});

	return response;
}

export async function fetchPage(pageId: string) {
	const response = await notion.pages.retrieve({ page_id: pageId }).catch((err) => {
		console.error(err);
	});

	return response;
}

export const fetchChildBlocks = async (blockId: string) => {
	const { results } = await notion.blocks.children.list({
		block_id: blockId,
		page_size: 100
	});

	return results;
};
