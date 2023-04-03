// @ts-nocheck

/** @type {import('./$types').PageLoad} */
export async function load(all) {
    return {
        title: `Title for {$cookie} goes here`,
    };
}