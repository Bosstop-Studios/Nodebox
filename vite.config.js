import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './webSocketPluginVite.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), webSocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
    server: {
        port: process.env.PORT,
    }
};

export default config;
