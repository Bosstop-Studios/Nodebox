// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if(session == false && event.url.pathname != '/auth/login') {
        throw redirect(307, '/auth/login');
    }

    if(!session && event.url.pathname != '/auth/login') {
        throw redirect(307, '/auth/login');
    }

    return await resolve(event);
};