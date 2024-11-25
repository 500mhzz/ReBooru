import { createSessionClient } from '$lib/server/appwrite';
import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ cookies }) => {
		const { account } = createSessionClient(cookies);

		await account.deleteSession('current');
		const cookie = cookies.get('session');
		if (cookie) {
			cookies.delete('session', { path: '/' });
		}

		return redirect(302, '/?message=Logged you out, Goodbye!');
	}
};
