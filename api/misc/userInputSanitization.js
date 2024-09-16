import { body } from 'express-validator';

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

const blogSanitization = () => {
	const rules = [
		body('title')
			.notEmpty()
			.withMessage('Blog title must be provided')
			.bail()
			.escape()
			.isLength({ min: 3, max: 50 })
			.withMessage('Blog title must be between 3 and 50 characters long'),
		body('body')
			.notEmpty()
			.withMessage('Blog body must be provided')
			.bail()
			.escape()
			.isLength({ min: 15 })
			.withMessage('Blog body must be at least 15 characters long'),
	];

	return rules;
};

const commentSanitization = () => {
	const rules = [
		body('body')
			.notEmpty()
			.withMessage('Comment body must be provided')
			.bail()
			.escape()
			.isLength({ min: 3, max: 150 })
			.withMessage('Comment body must be between 3 and 150 characters long'),
	];

	return rules;
};

export default {
	credentialsSanitization,
	blogSanitization,
	commentSanitization,
};
