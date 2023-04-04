// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        cookies.delete('session');
        throw redirect(307, "/");    
    }
};