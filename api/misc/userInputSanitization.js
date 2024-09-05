const { body } = require('express-validator');

const credentialsSanitization = () => {
	const rules = [
		body('username')
			.notEmpty()
			.withMessage('Username must be provided')
			.bail()
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage('Special characters and spaces are not allowed (username).'),
		body('password')
			.notEmpty()
			.withMessage('Password must be provided')
			.bail()
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage('Special characters and spaces are not allowed (password).'),
	];

	return rules;
};

module.exports = { credentialsSanitization };
