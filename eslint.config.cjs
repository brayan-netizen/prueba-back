const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');

module.exports = [
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				process: 'readonly',
				require: 'readonly',
				module: 'readonly',
				__dirname: 'readonly',
				console: 'readonly'
			}
		},
		plugins: {
			import: importPlugin
		},
		rules: {
			'import/no-unresolved': 'error'
		}
	}
];
