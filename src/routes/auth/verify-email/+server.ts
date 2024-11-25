import { error, redirect } from '@sveltejs/kit';
import { createSessionClient } from '$lib/server/appwrite';

export const GET = async ({ url, cookies, locals }) => {
	const secret = url.searchParams.get('secret');
	const userId = url.searchParams.get('userId');

	if(!locals.user) {
		return redirect(302, '/auth/login?message=You need to login to verify your email.');
	}

	if(locals.user.emailVerification) {
		return redirect(302, '/?message=Email already verified.');
	}

	if (!secret || !userId) {
		throw error(400, 'Missing secret or userId');
	}



	const {  account  } = createSessionClient(cookies);

	await account.updateVerification(userId, secret).catch((e) => {
		throw error(400, e.message);
	});

	redirect(302, '/?message=Email Verified Successfully!');
};
