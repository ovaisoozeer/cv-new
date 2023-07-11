import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

export default function getRichTextContent(richTextBlocks: RichTextItemResponse[]): string {
	let innerHtml = '';
	richTextBlocks.forEach((richTextItem: RichTextItemResponse) => {
		if (richTextItem.href) {
			innerHtml += `<a href="${richTextItem.href}" class="text-oodark dark:text-oohighlight hover:underline">${richTextItem.plain_text}</a>`;
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
