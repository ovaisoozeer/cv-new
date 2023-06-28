export async function load({ params }) {
	const pageTitle = params.slug;

	const resp = await fetch(`/api/page-elements?pageId=${pageTitle}`);

	const blockElements = await resp.json();

	return {
		blocks: structuredClone(blockElements) //sveltekit does not like types (!)
	};
}
