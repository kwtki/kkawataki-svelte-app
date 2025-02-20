import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: process.env.NODE_ENV === "production" ? "/kkawataki-svelte-app" : "", 
	plugins: [sveltekit()]
});
