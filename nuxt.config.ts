export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/main.css'],
	modules: ['@nuxt/content', '@storyblok/nuxt'],
	storyblok: { accessToken: process.env.STORYBLOK_ACCESS_TOKEN },
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
			EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
			EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
		},
	},
});
