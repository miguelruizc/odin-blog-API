const { validationResult } = require('express-validator');

const POST_register = (req, res) => {
	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	res.json({
		message: 'User registered',
		username: req.body.username,
		password: req.body.password,
	});
};

module.exports = {
	POST_register,
};
