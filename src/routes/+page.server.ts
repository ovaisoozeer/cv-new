import posts from '../data';

export function load() {
	return {
		testdata: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
