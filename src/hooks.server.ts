import { get } from 'svelte/store';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { selectedLocale } from '$lib/translations';

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', get(selectedLocale))
	});

	return response;
}) satisfies Handle;

export const handleError: HandleServerError = ({ error }) => {
	const message = 'Error caught in [server-hooks]: ' + (error as any)?.message;
	console.error(message);
	return { message };
};
