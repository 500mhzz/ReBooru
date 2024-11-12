import { prisma } from '$lib/server/db';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	await prisma.$connect();
	if (!event.cookies.get('jwt')) {
		return resolve(event);
	}

	const token = event.cookies.get('jwt');

	if (!token) {
		return resolve(event);
	}

	const decoded: { id: string; iat: number; exp: number } = jwt.verify(
		token.toString(),
		env.JWT_SECRET
	) as {
		id: string;
		iat: number;
		exp: number;
	};

	if (!decoded) {
		event.cookies.delete('jwt', { path: '/' });
		return resolve(event);
	}

	const user = prisma.user.findUnique({ where: { id: decoded.id } });

	if (!user) {
		event.cookies.delete('jwt', { path: '/' });
		return resolve(event);
	}

	event.locals.user = user;

	return resolve(event);
};
