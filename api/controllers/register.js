const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../misc/jwt');

const prisma = new PrismaClient();

const POST_register = async (req, res, next) => {
	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	try {
		// Check if user already exists
		const username = req.body.username;
		const password = await bcrypt.hash(req.body.password, 10);
		const userExists = await prisma.user.findUnique({ where: { username } });
		if (userExists) {
			return res.status(409).json({ error: 'Username already exists' });
		}

		// Add user to database
		const user = await prisma.user.create({
			data: {
				username,
				password,
				author: false,
			},
		});
		console.log('User registered:\n-', user.username);

		// Create JWT token
		const token = generateJWT(user);

		// Respond with JWT attached
		return res.json({
			message: `User registered: ${username}`,
			JWT: token,
		});
	} catch (error) {
		console.error('Error handling POST /register request: ', error);
		return next(error);
	}
};

module.exports = {
	POST_register,
};
