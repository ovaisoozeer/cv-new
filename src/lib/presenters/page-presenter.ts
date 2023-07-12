import { getRichTextViewModel } from '$lib/presenters/rich-text-content-factory';
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import type { RichTextBlock } from '../display-types/rich-text-block';

export async function getPageViewModel(title: string): Promise<Array<RichTextBlock>> {
	const resp = await fetch(`/api/page?title=${title}`);
	const data = await resp.json();
	const viewModel = getRichTextViewModel(data as ListBlockChildrenResponse);
	return viewModel;
}
