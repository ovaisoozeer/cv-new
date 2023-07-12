import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import type {
	ListBlockChildrenResponse,
	RichTextItemResponse,
	PageObjectResponse,
	QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import { ProjectRow } from './display-types/project-row';
import { getRichTextHtmlString } from './rich-text-content';

const NOTION_TOKEN = env.NOTION_TOKEN;
const notion = new Client({
	auth: NOTION_TOKEN
});
const blogDatabaseId = '5efa1a052a544c24bd1cfa6fb77bf205';

async function getChildBlocks(blockId: string): Promise<ListBlockChildrenResponse> {
	return await notion.blocks.children.list({
		block_id: blockId,
		page_size: 100
	});
}

export async function getProjectRows(): Promise<Array<PageObjectResponse>> {
	const dbQueryResponse = await notion.databases.query({
		database_id: '0e8541767ed14a42a56730e7541ee028'
	});
	return dbQueryResponse.results.filter(
		(row) => row as PageObjectResponse
	) as Array<PageObjectResponse>;
	// const projectRows = getProjectRowsViewModel(dbPages);
	// return projectRows;
}

// function getProjectRowsViewModel(rows: Array<PageObjectResponse>): Array<ProjectRow> {
// 	return rows.map((row) => {
// 		const projectRow = new ProjectRow();
// 		projectRow.Role = getRichTextHtmlString(
// 			(row as PageObjectResponse).properties.Role.rich_text as RichTextItemResponse[]
// 		);
// 		projectRow.Client = getRichTextHtmlString(
// 			(row as PageObjectResponse).properties.Client.rich_text as RichTextItemResponse[]
// 		);
// 		projectRow.Achievement = getRichTextHtmlString(
// 			(row as PageObjectResponse).properties['Key achievement/Learning']
// 				.rich_text as RichTextItemResponse[]
// 		);
// 		projectRow.Description = getRichTextHtmlString(
// 			(row as PageObjectResponse).properties['Project description'].title as RichTextItemResponse[]
// 		);
// 		return projectRow;
// 	});
// }

export async function getPageContent(title: string): Promise<ListBlockChildrenResponse> {
	const page = await await notion.search({ query: title });
	return await getChildBlocks(page.results[0].id);
}

export async function getArticleRows(maturity: string): Promise<QueryDatabaseResponse> {
	return await notion.databases.query({
		database_id: blogDatabaseId,
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
						contains: 'published'
					}
				}
			]
		}
	});
}

export async function getArticleContent(title: string): Promise<ListBlockChildrenResponse> {
	const rows = await notion.databases.query({
		database_id: blogDatabaseId,
		filter: {
			property: 'Name',
			rich_text: {
				equals: title
			}
		}
	});
	return await getChildBlocks(rows.results[0].id);
}
