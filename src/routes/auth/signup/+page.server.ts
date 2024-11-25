import { redirect } from '@sveltejs/kit';
import {
	SESSION_COOKIE,
	createAdminClient,
	createDatabaseEntry,
	avatars
} from '$lib/server/appwrite';
import { ID } from 'node-appwrite';

export const load = async ({ locals }) => {
	if (locals.user) {
		redirect(302, '/?message=Already Logged In');
	}
};

export const actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const { email, password, name } = Object.fromEntries(await request.formData());

		const { account } = createAdminClient();

		// Create the session using the client
		await account.create(ID.unique(), email.toString(), password.toString(), name.toString());
		const session = await account.createEmailPasswordSession(email.toString(), password.toString());

		const randomAvatarUrl = avatars[Math.floor(Math.random() * avatars.length)];
		const userIp = request.headers.get('x-forwarded-for') || getClientAddress();

		await createDatabaseEntry(session.userId, name.toString(), randomAvatarUrl, null, userIp);

		// Set the session cookie with the secret
		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		redirect(302, '/?message=Welcome to ReBooru! Please check your email to verify your account.');
	}
};
