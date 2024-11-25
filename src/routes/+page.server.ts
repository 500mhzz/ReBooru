import { createSessionClient } from '$lib/server/appwrite';
import { Databases } from 'node-appwrite';

export const load = async ({ cookies }) => {
	const { account } = await createSessionClient(cookies);
	const database = new Databases(account.client);

	const posts = await database.listDocuments('67432f0f000835f5d283', '67432f1500265bca778f');

	return {
		posts: posts || { posts: 'none' }
	};
};
