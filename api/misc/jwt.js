const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
			isAuthor: user.author,
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: '1h',
		}
	);
};

const authorizeJWT = (req, res, next) => {
	// Extract JWT from Authorization header
	// -format: (Authorization: Bearer <token>)
	const token = req.header('Authorization')?.split(' ')[1];

	// No token - Access denied: Not authenticated
	if (!token) {
		return res
			.status(403)
			.json({ message: 'Access denied: Not authenticated' });
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		// Invalid token - Access denied: Invalid JWT
		if (err)
			return res.status(403).json({ messafe: 'Access denied: Invalid JWT' });

		// Valid token - Acess granted
		req.user = user;
		next();
	});
};

module.exports = { generateJWT, authorizeJWT };
