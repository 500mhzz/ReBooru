import { prisma } from '$lib/server/db';
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
	return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
	return bcrypt.compare(password, hash);
}

export async function createUser(email: string, username: string, password: string) {
	if (password.length < 8) {
		throw new Error('Password must be at least 8 characters long');
	}

	if (
		await prisma.user.findUnique({ where: { email } }) ||
		await prisma.user.findUnique({ where: { username } })
	) {
		throw new Error('User with the same username or email already exists');
	}

	const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
	if (!usernameRegex.test(username)) {
		throw new Error('Username must be 4-16 characters long and can only contain letters, numbers and underscores');
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		throw new Error('Invalid email address');
	}

	const hashedPassword = await hashPassword(password);

	const user = await prisma.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
			profile: {
				create: {
					bio: "None Provided",
					avatarUrl: "https://www.gravatar.com/avatar/"
				}
			}
		}
	});

	return {
		user,
		hashedPassword
	};
}

export async function getUserByEmail(email: string) {
	return prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: string) {
	return prisma.user.findUnique({ where: {
			username
		}
	});
}

export async function getUserById(id: string) {
	return prisma.user.findUnique({ where: { id } });
}

export async function loginUser(email: string, password: string) {
	const user = await getUserByEmail(email);

	if (!user) {
		throw new Error('Invalid user, please try again later.');
	}

	const passwordMatch = await verifyPassword(password, user.password);

	if (!passwordMatch) {
		throw new Error('Invalid password, please try again later.');
	}

	return {
		user
	};
}