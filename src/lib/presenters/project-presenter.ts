import { ProjectRow } from '$lib/display-types/project-row';
import { getRichTextHtmlString } from '$lib/presenters/rich-text-content-factory';
import type {
	PageObjectResponse,
	RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

export async function getProjectRowsViewModel(): Promise<Array<ProjectRow>> {
	const resp = await fetch('/api/project-list');
	const data = await resp.json();
	const articles = data.map((row: PageObjectResponse) => {
		const projectRow = new ProjectRow();
		projectRow.Role = getRichTextHtmlString(
			(row as PageObjectResponse).properties.Role.rich_text as RichTextItemResponse[]
		);
		projectRow.Client = getRichTextHtmlString(
			(row as PageObjectResponse).properties.Client.rich_text as RichTextItemResponse[]
		);
		projectRow.Achievement = getRichTextHtmlString(
			(row as PageObjectResponse).properties['Key achievement/Learning']
				.rich_text as RichTextItemResponse[]
		);
		projectRow.Description = getRichTextHtmlString(
			(row as PageObjectResponse).properties['Project description'].title as RichTextItemResponse[]
		);
		return projectRow;
	});
	return articles;
}
