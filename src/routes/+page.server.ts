import { getRichTextBlocks, searchPage } from '$lib/notion-service';
import type {
	Heading2BlockObjectResponse,
	ParagraphBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export async function load() {
	const page = await searchPage('home');
	const blocks = await getRichTextBlocks(page.results[0].id);
	console.log('got blocks', blocks);

	const blockElements = blocks.results.map((block) => {
		switch (
			block.type //TODO: make safe
		) {
			//TODO: handle multiple rich text children
			case 'heading_2':
				return {
					type: 'h2',
					content: (block as Heading2BlockObjectResponse).heading_2.rich_text[0].plain_text
				};
				break;
			case 'paragraph':
				return {
					type: 'p',
					content: (block as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text
				};
		}
	});

	console.log('Mapped block elements', blockElements);

	return {
		title: 'home',
		blocks: blockElements
	};
}
