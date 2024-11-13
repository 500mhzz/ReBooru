export const load = async ({ locals }) => {
	if (!locals.user) return;
	return {
		user: await locals.user
	};
};
