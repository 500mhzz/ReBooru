// place files you want to import through the `$lib` alias in this folder.

// export const protectedRoute = async (locals) => {
// 	const fromUrl =
// }

import type { RequestEvent } from '@sveltejs/kit';

export function handleLoginRedirects(event: RequestEvent) {
	const redirectTo = event.url.pathname + event.url.search
	return `/login?from=${redirectTo}`
}