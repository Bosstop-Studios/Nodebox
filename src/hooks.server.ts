// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if((event.url.pathname != '/auth/login' || event.url.pathname != '/auth/logout') && !session) throw redirect(307, '/auth/login');

    return await resolve(event);
};