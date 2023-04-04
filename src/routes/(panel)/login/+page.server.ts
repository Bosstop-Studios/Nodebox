// @ts-nocheck
import { env } from '$env/dynamic/private'
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        if (!username || !password) return customResponse(400, false, 'Username and Password are required');

        if (typeof username !== 'string' || typeof password !== 'string') {
            return { status: 400, message: 'Username and Password must be strings'}
        }

        if(username == env.panel_username && password == env.panel_password) {
            cookies.set('session', 'logged_in', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30
            });

            throw redirect(303, "/");
        }
        
    }

};