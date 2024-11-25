import { redirect } from '@sveltejs/kit';
import { createSessionClient } from '$lib/server/appwrite';
import { Databases, ID, Permission, Query, Role, Storage } from 'node-appwrite';
import { env } from '$env/dynamic/public';

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const formData = await request.formData();
		const content = formData.get('content');
		const tagsArray = formData.get('tagsArray')?.toString().split(',') || [];
		const attachments = formData.getAll('attachments');

		if (!locals.user) {
			redirect(302, '/login?message=You need to be logged in to create a post!');
		}

		if(!locals.user.emailVerification) {
			redirect(302, '/?message=You need to verify your email to create a post!');
		}

		if (!content || content.toString().length === 0) {
			redirect(302, '/new/post?message=You need to write something to create a post!');
		}

		const formattedTagsArray = tagsArray.filter(
			(tag) => tag.length > 0 && /^[a-zA-Z0-9_-]+$/.test(tag)
		);

		const { account } = createSessionClient(cookies);
		const database = new Databases(account.client);
		const storage = new Storage(account.client);

		const attachmentsUrls = [];
		for (const attachment of attachments as unknown as File[]) {
			const fileBuffer = await attachment.arrayBuffer();
			const fileBlob = new Blob([fileBuffer]);
			const fileObject = new File([fileBlob], attachment.name, { type: attachment.type });

			const upload = await storage.createFile(env.PUBLIC_APPWRITE_BUCKET, ID.unique(), fileObject);
			attachmentsUrls.push(
				`https://cloud.appwrite.io/v1/storage/buckets/${env.PUBLIC_APPWRITE_BUCKET}/files/${upload.$id}/view?project=${env.PUBLIC_APPWRITE_PROJECT}`
			);
		}

		const tagIds = [];

		for (const tag of formattedTagsArray) {
			const fetchedTag = await database.listDocuments(
				env.PUBLIC_APPWRITE_DATABASE,
				env.PUBLIC_APPRITE_TAGS_COLLECTION,
				[Query.equal('name', tag)]
			);

			if (fetchedTag.documents.length !== 0) {
				tagIds.push(fetchedTag.documents[0].$id);
				continue;
			}

			const createdTag = await database.createDocument(
				env.PUBLIC_APPWRITE_DATABASE,
				env.PUBLIC_APPRITE_TAGS_COLLECTION,
				ID.unique(),
				{
					name: tag
				}
			);

			tagIds.push(createdTag.$id);
		}

		await database.createDocument(
			env.PUBLIC_APPWRITE_DATABASE,
			env.PUBLIC_APPRITE_POSTS_COLLECTION,
			ID.unique(),
			{
				content: content!.toString(),
				attachments: attachmentsUrls,
				tags: tagIds,
				createdAt: new Date(),
				user: locals.user.$id
			},
			[
				Permission.read(Role.users()),
				Permission.update(Role.user(locals.user.$id)),
				Permission.delete(Role.user(locals.user.$id)),
				Permission.write(Role.user(locals.user.$id))
			]
		);

		redirect(302, '/');
	}
};
