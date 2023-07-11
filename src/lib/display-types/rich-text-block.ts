export class RichTextBlock {
	blockType!: RichTextBlockType;
	richTextHtmlString?: string;
	imageUrl?: string;
}

export enum RichTextBlockType {
	title,
	section,
	subsection,
	paragraph,
	break,
	bullet,
	image
}
