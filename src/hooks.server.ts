// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    const session = event.cookies.get('session');

    if(session == false && event.url.pathname != '/auth/login') {
        throw redirect(307, '/auth/login');
    }

    if(!session && event.url.pathname != '/auth/login') {
        throw redirect(307, '/auth/login');
    }

    if (event.url.pathname.startsWith('/api')) {
        // Required for CORS to work
        if(event.request.method === 'OPTIONS') {
          return new Response(null, {
            headers: {
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
              'Access-Control-Allow-Origin': '*',
            }
          });
        }
    
        response.headers.append('Access-Control-Allow-Origin', `*`);
    }

    return response;
};