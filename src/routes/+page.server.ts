import posts from '../data';
import { fetchChildBlocks, fetchPage, searchPage } from '../lib/notion-client';

export async function load() {
	// const page = await fetchPage('106e4b9e1f504d588348d4e4ded6ffc4');
	// console.log('Got response:', page);

	// const blocks = await fetchChildBlocks('106e4b9e1f504d588348d4e4ded6ffc4');
	// console.log('block response:', blocks);

	const page = await searchPage('home');
	console.log('search results', page);

	return {
		// blocks: blocks.map((block) => ({
		// 	type: block.type,
		// 	text: block.child_page?.title
		// })),
		// testdata: posts.map((post) => ({
		// 	slug: post.slug,
		// 	title: post.title
		// }))
	};
}
