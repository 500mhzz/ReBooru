import { error } from '@sveltejs/kit';
import { createSessionClient } from '$lib/server/appwrite';
import { env } from '$env/dynamic/public';
import { Databases } from 'node-appwrite';

export const load = async ({ params, cookies }) => {
	const { id } = params;
	if(!id) {
		return error(404, 'Post id not provided.');
	}

	const { account } = createSessionClient(cookies);
	const database = new Databases(account.client);

	const post = await database.getDocument(env.PUBLIC_APPWRITE_DATABASE, env.PUBLIC_APPRITE_POSTS_COLLECTION, id);

	if(!post) {
		return error(404, 'Post not found.');
	}

	return {
		post
	};
}