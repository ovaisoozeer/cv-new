export class BlockElement {
	blockType!: BlockType;
	richTextHtmlString?: string;
	imageUrl?: string;
}

export enum BlockType {
	title,
	section,
	subsection,
	paragraph,
	break,
	bullet,
	image
}
