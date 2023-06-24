import posts from '../data';
import { fetchChildBlocks, fetchPage } from '../lib/notion-client';

export async function load() {
	const page = await fetchPage('106e4b9e1f504d588348d4e4ded6ffc4');
	console.log('Got response:', page);

	const blocks = await fetchChildBlocks('106e4b9e1f504d588348d4e4ded6ffc4');
	console.log('Got response:', blocks);

	return {
		testdata: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
