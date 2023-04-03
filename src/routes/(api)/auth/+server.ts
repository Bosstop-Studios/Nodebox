// @ts-nocheck
import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit';

import { cookie } from '../../../../src/lib/js/store.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let req = await request.json();
    if(req.username == env.panel_username && req.password == env.panel_password) {
        cookie.set(true);
        return new Response(JSON.stringify({ status: 200 }));
    }

    return new Response(error(401, 'Invalid credentials'));
}