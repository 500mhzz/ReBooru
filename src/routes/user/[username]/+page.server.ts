import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export const load = async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: { username: params.username },
		include: {
			profile: true,
			posts: true
		}
	});

	if (!user) {
		return error(404, 'User not found');
	}

	return {
		user
	};
};
