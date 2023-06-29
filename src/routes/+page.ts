export const ssr = false;

export async function load() {
	const resp = await fetch(`/api/page-elements?pageId=home`);

	const blockElements = await resp.json();

	return {
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
