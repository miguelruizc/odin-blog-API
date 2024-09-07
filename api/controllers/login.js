const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../misc/jwt');

const prisma = new PrismaClient();

const POST_login = async (req, res, next) => {
	// Check for validation/sanitization errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array().map((error) => error.msg),
		});
	}

	try {
		// Check if user exists
		const username = req.body.username;
		const password = req.body.password;

		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) return res.status(401).json({ error: "User doesn't exist" });

		// Check if password matches
		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword)
			return res.status(401).json({ error: 'Invalid password' });

		// Generate and send JWT
		const token = generateJWT(user);
		console.log('*---\nUser authenticated:\n-', user.username);

		return res.json({
			message: `User ${user.username} authenticated`,
			JWT: token,
		});
	} catch (error) {
		console.error('Error handling POST /login request: ', error);
		return next(error);
	}
};

module.exports = {
	POST_login,
};
