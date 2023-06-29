export class BlockElement {
	blockType?: BlockType;
	plain_text?: string;
	annotations?: {
		bold?: boolean;
		italic?: boolean;
		strikethrough?: boolean;
		underline?: boolean;
		// code?: boolean; // Unsupported
		// color?: string; // Unsupported
	};
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
