import { account } from '$lib/server/appwrite';
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const secret = url.searchParams.get('secret');
	const userId = url.searchParams.get('userId');

	if (!secret || !userId) {
		throw error(400, 'Missing secret or userId');
	}

	await account.updateVerification(secret, userId).catch((e) => {
		throw error(400, e.message);
	});

	redirect(302, '/?message=Email Verified Successfully!');
};
