export class BlockElement {
	blockType!: BlockType;
	text!: string;
}

export enum BlockType {
	title,
	section,
	subsection,
	paragraph,
	break,
	bullet
}
