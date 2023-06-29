export class BlockElement {
	blockType?: BlockType;
	plain_text?: string;
	isBold?: boolean;
	isItalic?: boolean;
	isUnderline?: boolean;
	isStrikethrough?: boolean;
	isCode?: boolean;
	color?: string;
}

export enum BlockType {
	title,
	section,
	subsection,
	paragraph,
	break,
	bullet
}
