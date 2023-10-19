module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@nuxtjs/eslint-config-typescript',
		'prettier',
	],
	plugins: [],
	rules: {
		'vue/multi-word-component-names': 0,
		'vue/no-multiple-template-root': 0,
		camelcase: 0,
	},
};
