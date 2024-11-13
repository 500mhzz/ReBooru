import { loginUser } from '$lib/server/auth';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.user) return redirect(302, "/");
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		try {
			const { password, email } = Object.fromEntries(await request.formData());
			const user = await loginUser(email.toString(), password.toString());

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
				maxAge: 2 * 24 * 3600,
				sameSite: 'lax'
			});
		} catch (e) {
			throw new Error(`${(e as { message: string }).message || 'An unkown error has occured.'}`);
		}

		const redirectTo = url.searchParams.get('from') || '/';
		if(redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`)
		}
		return redirect(302, '/');
	}
};
