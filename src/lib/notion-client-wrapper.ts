import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import type {
	ListBlockChildrenResponse,
	SearchResponse,
	Heading2BlockObjectResponse,
	ParagraphBlockObjectResponse,
	Heading1BlockObjectResponse,
	Heading3BlockObjectResponse,
	BulletedListItemBlockObjectResponse,
	RichTextItemResponse,
	ImageBlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { BlockElement, BlockType } from './display-types/block-element';
import { ProjectRow } from './display-types/project-row';
import getRichTextContent from './rich-text-content';
import { BlogArticle } from './display-types/blog-article';

const NOTION_TOKEN = env.NOTION_TOKEN;
const notion = new Client({
	auth: NOTION_TOKEN
});

export async function searchPage(title: string): Promise<SearchResponse> {
	return await notion.search({ query: title });
}

export async function getRichTextBlocks(blockId: string): Promise<ListBlockChildrenResponse> {
	return await notion.blocks.children.list({
		block_id: blockId,
		page_size: 100
	});
}

export async function getProjectDb(): Promise<Array<ProjectRow>> {
	const rows = await notion.databases.query({
		database_id: '0e8541767ed14a42a56730e7541ee028'
	});

	const projectRows = rows.results.flatMap((row) => {
		if (!(row as PageObjectResponse)) {
			return [];
		}
		const rowResult = new ProjectRow();
		rowResult.Role = getRichTextContent(
			(row as PageObjectResponse).properties.Role.rich_text as RichTextItemResponse[]
		);
		rowResult.Client = getRichTextContent(
			(row as PageObjectResponse).properties.Client.rich_text as RichTextItemResponse[]
		);
		rowResult.Achievement = getRichTextContent(
			(row as PageObjectResponse).properties['Key achievement/Learning']
				.rich_text as RichTextItemResponse[]
		);
		rowResult.Description = getRichTextContent(
			(row as PageObjectResponse).properties['Project description'].title as RichTextItemResponse[]
		);
		return rowResult;
	});
	return projectRows;
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
				heading1.richTextHtmlString = getRichTextContent(
					(block as Heading1BlockObjectResponse).heading_1.rich_text
				);
				return [heading1];
			}
			case 'heading_2': {
				const heading2 = new BlockElement();
				heading2.blockType = BlockType.section;
				heading2.richTextHtmlString = getRichTextContent(
					(block as Heading2BlockObjectResponse).heading_2.rich_text
				);
				return [heading2];
			}
			case 'heading_3': {
				const heading3 = new BlockElement();
				heading3.blockType = BlockType.subsection;
				heading3.richTextHtmlString = getRichTextContent(
					(block as Heading3BlockObjectResponse).heading_3.rich_text
				);
				return [heading3];
			}
			case 'paragraph': {
				const paragraph = new BlockElement();
				paragraph.blockType = BlockType.paragraph;
				paragraph.richTextHtmlString = getRichTextContent(
					(block as ParagraphBlockObjectResponse).paragraph.rich_text
				);
				return [paragraph];
			}
			case 'bulleted_list_item': {
				const bullet = new BlockElement();
				bullet.blockType = BlockType.bullet;
				bullet.richTextHtmlString = getRichTextContent(
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

export async function getPublishedArticles(maturity: string): Promise<Array<BlogArticle>> {
	console.log(maturity);
	const rows = await notion.databases.query({
		database_id: '5efa1a052a544c24bd1cfa6fb77bf205',
		filter: {
			and: [
				{
					property: 'Tags',
					multi_select: {
						contains: maturity
					}
				},
				{
					property: 'Tags',
					multi_select: {
						contains: 'Published'
					}
				}
			]
		}
	});
	console.log(rows);

	const articles = rows.results.flatMap((row) => {
		if ((row as PageObjectResponse).properties['Name'].title.length == 0) {
			return [];
		}
		const rowResult = new BlogArticle();
		console.log(row);
		rowResult.Title = getRichTextContent((row as PageObjectResponse).properties['Name'].title);
		rowResult.TitleText = (row as PageObjectResponse).properties['Name'].title[0].plain_text;
		return rowResult;
	});

	console.log(articles);
	return articles;
}
