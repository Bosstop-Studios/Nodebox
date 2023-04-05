// @ts-nocheck
import ms from 'ms';
import { env } from '$env/dynamic/private'
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        if (!username || !password) return fail(400, 'Username and Password are required');

        if (typeof username !== 'string' || typeof password !== 'string') {
            return { status: 400, message: 'Username and Password must be strings'}
        }

        if(username == env.panel_username && password == env.panel_password) {
            cookies.set('session', true, {
                path: '/',
                httpOnly: false,
                sameSite: 'strict',
                maxAge: ms('1hr')
            });
            
            throw redirect(307, '/');;
        }
        return;
    }
};