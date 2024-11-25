// src/lib/server/appwrite.js
import { Account, Client, Databases, Permission, Role } from 'node-appwrite';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';

export const SESSION_COOKIE = 'session';

export const avatars = [
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d7f00110eeae5d6/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin',
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d5d000aab9adc61/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin',
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d54001cc146f528/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin',
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d490038440a1144/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin',
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d3900194d452c6f/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin',
	'https://cloud.appwrite.io/v1/storage/buckets/6743322d0031d9b6824c/files/67433d1f001ea5d2b197/view?project=673d8713002935e7895f&project=673d8713002935e7895f&mode=admin'
];

export function createAdminClient() {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT)
		.setKey(APPWRITE_KEY);

	return {
		get account() {
			return new Account(client);
		}
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSessionClient(cookies: any) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT);

	const session = cookies.get(SESSION_COOKIE);
	if (!session) {
		throw new Error('No user session');
	}

	client.setSession(session);

	return {
		get account() {
			return new Account(client);
		}
	};
}

export async function createDatabaseEntry(
	userId: string,
	username: string,
	avatar: string,
	description: string | null,
	ip: string
) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT)
		.setKey(APPWRITE_KEY);

	const database = new Databases(client);
	return await database
		.createDocument(
			'67432f0f000835f5d283',
			'674331df00016e6e111a',
			userId,
			{
				username,
				avatar,
				description,
				ip,
				createdAt: new Date()
			},
			[
				Permission.create(Role.user(userId)),
				Permission.delete(Role.user(userId)),
				Permission.read(Role.user(userId))
			]
		)
		.catch((e) => {
			console.error(e);
		});
}
