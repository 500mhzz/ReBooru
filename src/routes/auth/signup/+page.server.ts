import { createUser } from '$lib/server/auth';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user) return redirect(302, '/');
	throw redirect(302, '/auth/login');
};

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const { password, email, username } = Object.fromEntries(await request.formData());
			const user = await createUser(email.toString(), username.toString(), password.toString());

			if (!user) {
				new Error('Invalid user, please try again later.');
			}

			if (!env.JWT_SECRET) {
				new Error('JWT_SECRET not set');
			}

			const token = jwt.sign({ id: user.user.id }, env.JWT_SECRET, { expiresIn: '1h' });

			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				maxAge: 3600,
				sameSite: 'lax'
			});
		} catch (e) {
			new Error(`${(e as { message: string }).message || 'An unknown error has occured'}`);
		}

		return redirect(302, '/');
	}
};
