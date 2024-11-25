import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite';

export const load = async ({ locals }) => {
	if (locals.user) {
		redirect(302, '/?message=Already Logged In');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData());

		const { account } = createAdminClient();

		const session = await account.createEmailPasswordSession(email.toString(), password.toString());

		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		redirect(302, '/?message=Welcome back to ReBooru!');
	}
};
