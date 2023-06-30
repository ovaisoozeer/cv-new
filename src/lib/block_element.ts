export class BlockElement {
	blockType?: BlockType;
	innerHtml?: string;
}

export enum BlockType {
	title,
	section,
	subsection,
	paragraph,
	break,
	bullet
}
