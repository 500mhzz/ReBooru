import { error, redirect } from '@sveltejs/kit';
import { createSessionClient } from '$lib/server/appwrite';
import { env } from '$env/dynamic/public';
import { Databases, ID, Permission, Role } from 'node-appwrite';

export const load = async ({ params, cookies }) => {
	const { id } = params;
	if (!id) {
		throw error(404, 'Post id not provided.');
	}

	const { account } = createSessionClient(cookies);
	const database = new Databases(account.client);

	const post = await database.getDocument(
		env.PUBLIC_APPWRITE_DATABASE,
		env.PUBLIC_APPRITE_POSTS_COLLECTION,
		id
	);

	if (!post) {
		throw error(404, 'Post not found.');
	}

	return {
		post
	};
};

export const actions = {
	newComment: async ({ params, request, cookies, locals, url }) => {
		const { id } = params;
		if (!id) {
			return error(404, 'Post id not provided.');
		}

		if (!locals.user) {
			return {
				message: 'You need to be logged in to comment on a post.',
				status: 403
			}
		}

		const formData = await request.formData();
		const content = formData.get('content');

		if (!content || content.toString().length === 0) {
			return error(400, 'Comment content cannot be empty.');
		}

		const { account } = createSessionClient(cookies);
		const database = new Databases(account.client);

		await database.createDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_COMMENTS_COLLECTION,
			ID.unique(),
			{
				user: locals.user.$id,
				post: id,
				content: content.toString()
			},
			[
				Permission.create(Role.user(locals.user.$id)),
				Permission.delete(Role.user(locals.user.$id)),
				Permission.read(Role.user(locals.user.$id)),
			]
		);

		return {
			message: 'Comment added.',
			status: 200
		}
	},
	like: async ({ params, cookies, locals, url, request }) => {
		const { id } = params;
		const { commentId } = Object.fromEntries(await request.formData());
		if (!id) {
			return error(404, 'Post id not provided.');
		}

		if (!locals.user) {
			return;
		}

		const { account } = createSessionClient(cookies);
		const database = new Databases(account.client);

		const comment = await database.getDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_COMMENTS_COLLECTION,
			commentId.toString()
		);

		// Remove existing dislike if present
		for (const dislike of comment.dislikes) {
			if (dislike.user.$id === locals.user?.$id) {
				await database.deleteDocument(
					env.PUBLIC_APPWRITE_DATABASE,
					env.PUBLIC_APPRITE_DISLIKES_COLLECTION,
					dislike.$id
				);
			}
		}

		// Remove existing like if present
		for (const like of comment.likes) {
			if (like.user.$id === locals.user?.$id) {
				await database.deleteDocument(
					env.PUBLIC_APPWRITE_DATABASE,
					env.PUBLIC_APPRITE_LIKES_COLLECTION,
					like.$id
				);
				return {
					message: 'Like removed.',
					status: 200
				}
			}
		}

		await database.createDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_LIKES_COLLECTION,
			ID.unique(),
			{
				user: locals.user.$id,
				comments: commentId.toString()
			},
			[
				Permission.create(Role.user(locals.user.$id)),
				Permission.delete(Role.user(locals.user.$id)),
				Permission.read(Role.user(locals.user.$id)),
			]
		);

		return {
			message: 'Like added.',
			status: 200
		}
	},
	dislike: async ({ params, cookies, locals, url, request }) => {
		const { id } = params;
		const { commentId } = Object.fromEntries(await request.formData());
		if (!id) {
			return error(404, 'Post id not provided.');
		}

		if (!locals.user) {
			return {
				message: 'You need to be logged in to dislike a comment.',
				status: 403
			}
		}

		const { account } = createSessionClient(cookies);
		const database = new Databases(account.client);

		const comment = await database.getDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_COMMENTS_COLLECTION,
			commentId.toString()
		);

		// Remove existing like if present
		for (const like of comment.likes) {
			if (like.user.$id === locals.user?.$id) {
				await database.deleteDocument(
					env.PUBLIC_APPWRITE_DATABASE,
					env.PUBLIC_APPRITE_LIKES_COLLECTION,
					like.$id
				);
			}
		}

		// Remove existing dislike if present
		for (const dislike of comment.dislikes) {
			if (dislike.user.$id === locals.user?.$id) {
				await database.deleteDocument(
					env.PUBLIC_APPWRITE_DATABASE,
					env.PUBLIC_APPRITE_DISLIKES_COLLECTION,
					dislike.$id
				);
				return {
					message: 'Dislike removed.',
					status: 200
				}
			}
		}

		await database.createDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_DISLIKES_COLLECTION,
			ID.unique(),
			{
				user: locals.user.$id,
				comments: commentId.toString()
			},
			[
				Permission.create(Role.user(locals.user.$id)),
				Permission.delete(Role.user(locals.user.$id)),
				Permission.read(Role.user(locals.user.$id)),
			]
		);

		return {
			message: 'Dislike added.',
			status: 200
		}
	}
};
