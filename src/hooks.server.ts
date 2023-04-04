import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if (!session) throw redirect(307, '/login');;

    return await resolve(event);
};