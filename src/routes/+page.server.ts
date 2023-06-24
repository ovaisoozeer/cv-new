import posts from '../data';
import {Client} from '@notionhq/client';
import { env } from '$env/dynamic/private';

export async function load() {
	const NOTION_TOKEN = env.NOTION_TOKEN;
	const notion = new Client({
	    auth: NOTION_TOKEN,
	});

	const response =
		await notion.users.list({});

	console.log("Got response:", response);

	return {
		testdata: posts.map((post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
