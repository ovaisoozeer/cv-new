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
	BulletedListItemBlockObjectResponse,
	RichTextItemResponse,
	ImageBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { BlockElement, BlockType } from './block_element';

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

	// console.log('blocks', blocks);

	// using flatMap here to omit elements we don't explicitly want.
	const blockElements = blocks.results.flatMap((block) => {
		switch (
			block.type // TODO: make typesafe
		) {
			case 'heading_1': {
				const heading1 = new BlockElement();
				heading1.blockType = BlockType.title;
				heading1.richTextHtmlString = getRichTextHtmlString(
					(block as Heading1BlockObjectResponse).heading_1.rich_text
				);
				return [heading1];
			}
			case 'heading_2': {
				const heading2 = new BlockElement();
				heading2.blockType = BlockType.section;
				heading2.richTextHtmlString = getRichTextHtmlString(
					(block as Heading2BlockObjectResponse).heading_2.rich_text
				);
				return [heading2];
			}
			case 'heading_3': {
				const heading3 = new BlockElement();
				heading3.blockType = BlockType.subsection;
				heading3.richTextHtmlString = getRichTextHtmlString(
					(block as Heading3BlockObjectResponse).heading_3.rich_text
				);
				return [heading3];
			}
			case 'paragraph': {
				const paragraph = new BlockElement();
				paragraph.blockType = BlockType.paragraph;
				paragraph.richTextHtmlString = getRichTextHtmlString(
					(block as ParagraphBlockObjectResponse).paragraph.rich_text
				);
				return [paragraph];
			}
			case 'bulleted_list_item': {
				const bullet = new BlockElement();
				bullet.blockType = BlockType.bullet;
				bullet.richTextHtmlString = getRichTextHtmlString(
					(block as BulletedListItemBlockObjectResponse).bulleted_list_item.rich_text
				);
				return [bullet];
			}
			case 'image': {
				// TODO: figure out alt-text
				const image = new BlockElement();
				image.blockType = BlockType.image;
				const fileblock = (block as ImageBlockObjectResponse).image;
				switch (fileblock.type) {
					case 'file': {
						image.imageUrl = fileblock.file.url;
						break;
					}
					case 'external': {
						image.imageUrl = fileblock.external.url;
						break;
					}
				}
				return [image];
			}
			default: {
				const empty = new BlockElement();
				empty.blockType = BlockType.break;
				return [empty];
			}
		}
	});

	// console.log('elements', blockElements);

	return blockElements;
}

// this is leaking presentation code, but it's not a terrible compromise to get accessible code ¯\_(ツ)_/¯
function getRichTextHtmlString(richTextBlocks: RichTextItemResponse[]) {
	let innerHtml = '';
	richTextBlocks.forEach((richTextItem: RichTextItemResponse) => {
		if (richTextItem.href) {
			innerHtml += `<a href="${richTextItem.href}" class="text-blue-600 dark:text-blue-500 hover:underline">${richTextItem.plain_text}</a>`;
		} else {
			innerHtml += '<span class="';
			//handle annotations
			if (richTextItem.annotations.bold) {
				innerHtml += ' font-bold';
			}
			if (richTextItem.annotations.italic) {
				innerHtml += ' italic';
			}
			if (richTextItem.annotations.underline) {
				innerHtml += ' underline';
			}
			if (richTextItem.annotations.strikethrough) {
				innerHtml += ' line-through';
			}
			innerHtml += '">';
			innerHtml += richTextItem.plain_text;
			innerHtml += '</span>';
		}
	});
	return innerHtml;
}
