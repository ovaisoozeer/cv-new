import type {
	BulletedListItemBlockObjectResponse,
	Heading1BlockObjectResponse,
	Heading2BlockObjectResponse,
	Heading3BlockObjectResponse,
	ImageBlockObjectResponse,
	ListBlockChildrenResponse,
	ParagraphBlockObjectResponse,
	RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';
import { RichTextBlock, RichTextBlockType } from './display-types/rich-text-block';

export function getRichTextHtmlString(richTextBlocks: Array<RichTextItemResponse>): string {
	let innerHtml = '';
	richTextBlocks.forEach((richTextItem: RichTextItemResponse) => {
		if (richTextItem.href) {
			innerHtml += `<a href="${richTextItem.href}" class="text-oodark dark:text-oohighlight hover:underline">${richTextItem.plain_text}</a>`;
		} else {
			innerHtml += '<span class="';
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

export function getRichTextViewModel(blocks: ListBlockChildrenResponse): Array<RichTextBlock> {
	// using flatMap here to omit elements we don't explicitly want.

	return blocks.results.flatMap((block) => {
		switch (
			block.type // TODO: make typesafe
		) {
			case 'heading_1': {
				const heading1 = new RichTextBlock();
				heading1.blockType = RichTextBlockType.title;
				heading1.richTextHtmlString = getRichTextHtmlString(
					(block as Heading1BlockObjectResponse).heading_1.rich_text
				);
				return [heading1];
			}
			case 'heading_2': {
				const heading2 = new RichTextBlock();
				heading2.blockType = RichTextBlockType.section;
				heading2.richTextHtmlString = getRichTextHtmlString(
					(block as Heading2BlockObjectResponse).heading_2.rich_text
				);
				return [heading2];
			}
			case 'heading_3': {
				const heading3 = new RichTextBlock();
				heading3.blockType = RichTextBlockType.subsection;
				heading3.richTextHtmlString = getRichTextHtmlString(
					(block as Heading3BlockObjectResponse).heading_3.rich_text
				);
				return [heading3];
			}
			case 'paragraph': {
				const paragraph = new RichTextBlock();
				paragraph.blockType = RichTextBlockType.paragraph;
				paragraph.richTextHtmlString = getRichTextHtmlString(
					(block as ParagraphBlockObjectResponse).paragraph.rich_text
				);
				return [paragraph];
			}
			case 'bulleted_list_item': {
				const bullet = new RichTextBlock();
				bullet.blockType = RichTextBlockType.bullet;
				bullet.richTextHtmlString = getRichTextHtmlString(
					(block as BulletedListItemBlockObjectResponse).bulleted_list_item.rich_text
				);
				return [bullet];
			}
			case 'image': {
				// TODO: figure out alt-text
				const image = new RichTextBlock();
				image.blockType = RichTextBlockType.image;
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
				const empty = new RichTextBlock();
				empty.blockType = RichTextBlockType.break;
				return [empty];
			}
		}
	});
}
