import { createAdminClient } from '$lib/server/appwrite';
import { Databases } from 'node-appwrite';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url, params }) => {
	if (!locals.user && !url.toString().includes('/auth/')) {
		redirect(302, '/auth/login?message=You need to login to view this page.');
	}

	const { account } = await createAdminClient();
	const database = new Databases(account.client);

	if (url.toString().includes('/post') && params.id) {
		const post = await database.getDocument('67432f0f000835f5d283', '67432f1500265bca778f', params.id);

		if (!post) {
			return {
				status: 404,
				error: new Error('Post not found.')
			};
		}

		return {
			post,
			user: locals.user
		}
	}

	const tags = await database.listDocuments('67432f0f000835f5d283', '67432f3f0002dd8a57c6');

	return {
		user: locals.user,
		tags: tags || { tags: 'none' }
	};
};
