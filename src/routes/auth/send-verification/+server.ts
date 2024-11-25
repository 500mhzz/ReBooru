import { error, redirect } from '@sveltejs/kit';
import { createSessionClient } from '$lib/server/appwrite';
import { env } from '$env/dynamic/public';

export const GET = async ({ cookies, locals }) => {
	const {  account  } = createSessionClient(cookies);

	if(!locals.user) {
		return redirect(302, '/auth/login?message=You need to login to send verification email.');
	}

	if(locals.user.emailVerification) {
		return redirect(302, '/?message=Email already verified.');
	}

	await account.createVerification(`${env.PUBLIC_SITE_URL}/auth/verify-email`)

	redirect(302, '/?message=Sent verification email, please check your inbox.');
};
