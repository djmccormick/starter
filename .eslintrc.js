module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es2020: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	rules: {
		'linebreak-style': ['error', 'unix'],
		'no-cond-assign': ['error', 'always'],
		'no-unused-vars': ['error', { args: 'none' }],
		'prettier/prettier': 'error',
		'react/jsx-uses-react': 'off',
		'react/no-unescaped-entities': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'always']
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect'
		}
	},
	plugins: ['prettier']
};
