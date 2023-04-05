// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    return { status: 200 };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        cookies.set('session', false);
        throw redirect(307, "/auth/login");    
    }
};