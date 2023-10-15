/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		colors: {
			'dark-100': '#121113',
			'dark-200': '#48434C',
			'dark-300': '#1B1B1E',
			'gray-100': '#FFFFFF',
			'gray-200': '#9A939F',
			'gray-300': '#48434C',
			'gray-400': '#39333E',
			theme: '#FF8125',
			'theme-200': '#36200F',
		},
	},
	plugins: [],
};
