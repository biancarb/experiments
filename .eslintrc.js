module.exports = {
	root: true,
	extends: 'standard',
	rules: {
		'indent': ['warn', 'tab'],
		'no-tabs': 'off',
		'no-trailing-spaces': 'off',
		'padded-blocks': ['error', {
			'classes': 'always',
			'blocks': 'never',
			'switches': 'never'
		}],
		'space-before-function-paren': 'off',
		'brace-style': ['warn', 'stroustrup', { 'allowSingleLine': true }]
	}
}
