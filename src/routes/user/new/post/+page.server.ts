import { type ActionFailure, fail } from '@sveltejs/kit';
import { uploadFile } from '$lib/server/AWS/s3';
import { prisma } from '$lib/server/db';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const { title, content, tags, image } = Object.fromEntries(formData.entries());
		const formattedTags = (tags as string).split(',').map((tag: string) => tag.trim());

		if (!image || !(image as File).type) {
			return fail(400, {
				error: true,
				message: 'Image is required and must have a valid type'
			});
		}

		if (!title || !content) {
			return fail(400, {
				error: true,
				message: 'Title and content are required'
			});
		}
		const [file] = await Promise.all([
			uploadFile(image as File, {
				allowedTypes: ['image/jpeg', 'image/png'],
				maxSizeMB: 10,
				folder: `${locals.user.username}/posts`
			})
		]);

		if (typeof file === 'object' && file.success === false) {
			return fail(400, {
				error: true,
				message: file.message
			});
		}

		if (!file.url) {
			return fail(400, {
				error: true,
				message: 'Image upload failed'
			});
		}

		if (!file.success) {
			return fail(400, {
				error: true,
				message: file.message
			});
		}

		const post = await prisma.post.create({
			data: {
				title: title.toString(),
				description: content.toString(),
				url: { set: [file.url.toString()] }, // Adjusting the type to match the expected type
				user: {
					connect: {
						id: locals.user.id
					}
				},
				tags: {
					connectOrCreate: formattedTags.map((tag: string) => ({
						where: { name: tag },
						create: { name: tag }
					}))
				}
			}
		});

		return {
			success: true,
			message: 'Post created successfully',
			post
		};
	}
};
